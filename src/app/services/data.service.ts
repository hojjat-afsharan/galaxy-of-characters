import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  shareReplay,
  throwError,
  tap,
} from "rxjs";
import { environment } from "src/environments/environment";
import { Character, CharacterResponse } from "../components/character/models/character.model";

@Injectable({
  providedIn: "root",
})
export class DataService implements OnDestroy {

  private readonly ENDPOINTS = {
    PEOPLE_LIST_URL: (pageNumber: number, pageLimit: number) =>
      `${environment.starWarsUrl}/people?page=${pageNumber}&limit=${pageLimit}`,
    CHARACTER_URL: (uid: number) => `${environment.starWarsUrl}/people/${uid}`,
  };

  constructor(private http: HttpClient) { }




  public fetchCharacter(uid: number): Observable<Character> {
    return this.httpErrorHandler(
      this.http
        .get<CharacterResponse>(this.ENDPOINTS.CHARACTER_URL(uid))
        .pipe(
          map((response: CharacterResponse) => new Character(response.result))
        )
    );
  }

  private httpErrorHandler<T>(request: Observable<T>) {
    return request.pipe(
      catchError((error: HttpErrorResponse) => {
        // TODO: raise notification error in correspounding service (something like UserNotificationServer)
        return throwError(error);
      })
    );
  }
  handleHttpError(error: HttpErrorResponse) {
    // throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
