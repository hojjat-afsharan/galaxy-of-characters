import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, of, pairwise, switchMap, tap } from 'rxjs';
import { StateService } from 'src/app/shared/state-manager/state.service';
import { Character, CharacterResponse } from '../models/character.model';
import { CharacterDataService } from './character-data.service';

export interface CharacterPageParams {
  uid: number
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService{

  private _character$ = new BehaviorSubject<Character>({});
  public cahracter$ = this._character$.asObservable();
  previousUrl: any;

  constructor(
    private characterDataService: CharacterDataService,
    ) {}

    public getData(params: CharacterPageParams): Observable<Character> {
      return this.getCharacter(params.uid).pipe(
        tap((item: Character) => this._character$.next(item)))
    }

    public getCharacter(uid: number): Observable<Character> {
      const cacheId = 'person x' + String(uid);
      const cachedResponse = this.checkCachedData(cacheId);
      if (cachedResponse) {
        return of(JSON.parse(cachedResponse));
      }


      return this.characterDataService.fetchCharacter(uid).pipe(
        map((response: CharacterResponse) => new Character(response.result)),
        tap((data: Character) => localStorage.setItem(cacheId, JSON.stringify(data)))
      );
    }

    checkCachedData(cacheId: string): string | null {
      const cachedResponse = localStorage.getItem(cacheId);
      return cachedResponse;
    }
}

