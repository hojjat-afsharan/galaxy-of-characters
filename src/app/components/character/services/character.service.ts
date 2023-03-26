import { Injectable, OnDestroy } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  of,
  pairwise,
  ReplaySubject,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import { StateService } from "src/app/shared/state-manager/state.service";
import { Character, CharacterResponse } from "../models/character.model";
import { CharacterDataService } from "./character-data.service";

export interface CharacterPageParams {
  uid: number;
}

@Injectable({
  providedIn: "root",
})
export class CharacterService implements OnDestroy {
  private _character$ = new Subject<Character>();
  public cahracter$ = this._character$.asObservable();
  previousUrl: any;
  private subscription = new Subscription();

  constructor(private characterDataService: CharacterDataService) {}

  public getData(params: CharacterPageParams) {
    this.getCharacter(params.uid).subscribe();
  }

  private emitCharacter(character: Character) {
    console.log('emiting data', character);
    this._character$.next(character);
  }

  public getCharacter(uid: number): Observable<Character> {
    const cacheId = "person " + String(uid);
    const cachedResponse = this.checkCachedData(cacheId);
    if (cachedResponse) {
      return from(
        [new Character(JSON.parse(cachedResponse) as Character)]
      );
    } 
      return this.characterDataService.fetchCharacter(uid).pipe(
        map((response: CharacterResponse) => new Character(response.result)),
        tap((data: Character) => {
          // localStorage.setItem(cacheId, JSON.stringify(data));
          this.emitCharacter(data);
        })
      );
    
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
