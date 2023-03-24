import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, of, tap } from 'rxjs';
import { Character } from '../models/character.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService {

  private readonly DEFAULT_CHARACTER_UID = 1;

  private _characterData$ = new BehaviorSubject<Character>({});
  public characterData$ = this._characterData$.asObservable();

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const uid = route.params['uid'];

    if (!!this._characterData$.value) {
      console.log(uid);
      return this.dataService.fetchCharacter(uid ? +uid : this.DEFAULT_CHARACTER_UID).pipe(
        tap((data: Character) => console.log('DataResolver: Fetched data from API:', data)),
        tap((data: Character) => this._characterData$.next(data))
      )
    } else {
      return this.characterData$;
    }
  }
}
