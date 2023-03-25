import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterResponse } from '../../character/models/character.model';
import { PlanetResponse } from '../model/planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetDataService {

  private readonly ENDPOINTS = {
    PLANET_URL: (uid: number) => `${environment.starWarsUrl}/planets/${uid}`,
  };

  constructor(private http: HttpClient) { }

  public fetchPlanet(uid: number): Observable<PlanetResponse> {
    return this.httpErrorHandler(
      this.http.get<PlanetResponse>(this.ENDPOINTS.PLANET_URL(uid)));
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
