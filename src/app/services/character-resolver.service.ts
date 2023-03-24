import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Character } from '../models/character.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService {

  private readonly DEFAULT_CHARACTER_UID = 1;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {

    const uid = route.params['uid'];

    const cachedResponse = localStorage.getItem(uid);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.dataService.fetchCharacter(uid ? +uid : this.DEFAULT_CHARACTER_UID).pipe(
      tap((data: Character) => localStorage.setItem(uid, JSON.stringify(data))),
      catchError(error => {
        console.log(error);
        return error;
      })
    )
  }
}
