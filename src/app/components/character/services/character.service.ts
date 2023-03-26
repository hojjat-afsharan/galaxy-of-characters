import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, from, map, Observable, of, ReplaySubject, Subject, Subscription, tap } from "rxjs";
import { Character, CharacterResponse } from "../models/character.model";
import { CharacterDataService } from "./character-data.service";

export interface CharacterPageParams {
  uid: number;
}

@Injectable({
  providedIn: "root",
})
export class CharacterService implements OnDestroy {
  private _character$ = new BehaviorSubject<Character>({});
  public cahracter$ = this._character$.asObservable();
  previousUrl: any;
  private subscription = new Subscription();

  constructor(private characterDataService: CharacterDataService) {}

  public getData(params: CharacterPageParams) {
    this.subscription.add(this.getCharacter(params.uid).subscribe((character) =>
      this.emitCharacter(character)
    ));
  }

  private emitCharacter(character: Character) {
    this._character$.next(character);
  }

  public getCharacter(uid: number): Observable<Character> {
    const cacheId = "person " + String(uid);
    const cachedResponse = this.checkCachedData(cacheId);
    if (cachedResponse) {
      return of(new Character(JSON.parse(cachedResponse) as Character)).pipe(
        tap((item) => console.log(item))
      );
    }
    return this.characterDataService.fetchCharacter(uid).pipe(
      map((response: CharacterResponse) => new Character(response.result)),
      tap((data: Character) => {
        localStorage.setItem(cacheId, JSON.stringify(data));
      })
    );
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }

  public cleanData() {
    this._character$.next({});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
