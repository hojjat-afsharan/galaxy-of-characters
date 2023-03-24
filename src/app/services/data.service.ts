import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  private readonly ENDPOINTS = {
    PEOPLE_LIST: (pageNumber: number, pageLimit: number) => `${environment.starWarsUrl}/people?page=${pageNumber}&limit=${pageLimit}`
  }

  constructor(private http: HttpClient) { 
    // this.fetchPeople(1, 10);
  }

  public fetchPeople(pageSize: number, pageLimit: number): Observable<unknown> {
     return this.httpErrorHandler(this.http.get<unknown>(this.ENDPOINTS.PEOPLE_LIST(pageSize, pageLimit)));
  }

  private httpErrorHandler<T>(request: Observable<T>) {
    return request.pipe(
      catchError((error: HttpErrorResponse) => {
          // TODO: raise notification error in correspounding service (something like UserNotificationServer)
          return throwError(error);
      })
    )
  }
  handleHttpError(error: HttpErrorResponse) {
    // throw new Error('Method not implemented.');
  }


  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
