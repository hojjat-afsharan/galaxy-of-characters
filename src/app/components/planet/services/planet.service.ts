import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Planet, PlanetResponse } from '../model/planet.model';
import { PlanetDataService } from './planet-data.service';

export interface PlanetPageParams {
  uid: number
}

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private _planet$ = new BehaviorSubject<Planet>({});
  public planet$ = this._planet$.asObservable();

  constructor(private planetDataService: PlanetDataService) { }

  public getData(params: PlanetPageParams): Observable<Planet> {
    return this.getCharacter(params.uid).pipe(
      tap((item: Planet) => this._planet$.next(item)))
  }

  public getCharacter(uid: number): Observable<Planet> {
    const cacheId = 'planet ' + String(uid);
    const cachedResponse = this.checkCachedData(cacheId);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.planetDataService.fetchPlanet(uid).pipe(
      tap(item => console.log(item)),
      map((response: PlanetResponse) => new Planet(response.result)),
      tap((data: Planet) => localStorage.setItem(cacheId, JSON.stringify(data)))
    );
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }
}
