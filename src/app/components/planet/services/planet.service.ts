import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subscription, tap } from 'rxjs';
import { Planet, PlanetPageParams, PlanetResponse } from '../model/planet.model';
import { PlanetDataService } from './planet-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private _planet$ = new BehaviorSubject<Planet>({});
  public planet$ = this._planet$.asObservable();

  private subscription = new Subscription();

  constructor(private planetDataService: PlanetDataService) { }

  public getData(params: PlanetPageParams) {
    this.subscription.add(this.getCharacter(params.uid).subscribe((planet) => 
    this.emitPlanet(planet)));
  }

  private emitPlanet(planet: Planet) {
    this._planet$.next(planet);
  }

  public getCharacter(uid: number): Observable<Planet> {
    const cacheId = 'planet ' + String(uid);
    const cachedResponse = this.checkCachedData(cacheId);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.planetDataService.fetchPlanet(uid).pipe(
      map((response: PlanetResponse) => new Planet(response.result)),
      tap((data: Planet) => localStorage.setItem(cacheId, JSON.stringify(data)))
    );
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }

  public cleanData() {
    this._planet$.next({});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
