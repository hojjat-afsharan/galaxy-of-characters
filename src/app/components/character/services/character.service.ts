import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { State } from 'src/app/shared/state-manager/models/state.model';
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

  private state?: State;

  constructor(private stateService: StateService,
    private characterDataService: CharacterDataService,
    private route: ActivatedRoute
    ) { 
      this.stateService.state$.subscribe((state) => this.state = state);
    }



    public getData(params: CharacterPageParams): Observable<Character> {
      console.log(params);
      return this.getCharacter(params.uid).pipe(
        tap((item) => console.log(item)),
        tap((item: Character) => this._character$.next(item)))
    }

    public getCharacter(uid: number): Observable<Character> {
      const cacheId = String(uid);

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

