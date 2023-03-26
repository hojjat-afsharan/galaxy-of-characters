import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Character, CharacterResponse } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {

  private readonly ENDPOINTS = {
    CHARACTER_URL: (uid: number) => `${environment.starWarsUrl}/people/${uid}`,
  };

  constructor(private http: HttpClient) { }

  public fetchCharacter(uid: number): Observable<CharacterResponse> {
    return this.httpErrorHandler(
      this.http.get<CharacterResponse>(this.ENDPOINTS.CHARACTER_URL(uid)));
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
