import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { StateService } from 'src/app/shared/state-manager/state.service';
import { environment } from 'src/environments/environment';
import { People, PeopleResponse } from '../models/people.model';
import { PeopleService } from './people.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataServiceService implements OnDestroy{
  private readonly ENDPOINTS = {
    PEOPLE_LIST_URL: (pageNumber: number, pageLimit: number) =>
      `${environment.starWarsUrl}/people?page=${pageNumber}&limit=${pageLimit}`
  };

  constructor(private http: HttpClient) { }

  public fetchPeople(page: number, limit: number): Observable<PeopleResponse> {
    return this.httpErrorHandler(
      this.http
        .get<PeopleResponse>(
          this.ENDPOINTS.PEOPLE_LIST_URL(page, limit)
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
