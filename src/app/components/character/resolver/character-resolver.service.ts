import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Character } from 'src/app/components/character/models/character.model';
import { CharacterService } from '../services/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService {

  private readonly DEFAULT_CHARACTER_UID = 1;

  constructor(private characterService: CharacterService) { }

  resolve(route: ActivatedRouteSnapshot) {

    const uid = route.params['uid'];
    return of({});// this.characterService.getCharacter(uid ? +uid : this.DEFAULT_CHARACTER_UID);
  }
}
