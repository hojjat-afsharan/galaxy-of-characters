import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { StateService } from 'src/app/shared/state-manager/state.service';
import { Character, CharacterResponse } from '../models/character.model';
import { CharacterDataService } from './character-data.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private stateService: StateService,
    private characterDataService: CharacterDataService
    ) { }

    public getCharacter(uid: number): Observable<Character> {
      const cacheId = uid.toString();

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

