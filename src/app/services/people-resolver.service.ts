import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { People } from '../models/people.model';
import { DataService } from './data.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleResolverService implements Resolve<People[]> {

  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_LIMIT = 10;
  
  private _peopleData$ = new BehaviorSubject<People[]>([]);
  public peopleData$ = this._peopleData$.asObservable();

  constructor(private dataService: DataService, private readonly stateService: StateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log(state);
    
    const page = route.queryParams['page'];
    const limit = route.queryParams['limit'];

    const pageNumber = page ? + page: this.DEFAULT_PAGE;
    const limitNumber = limit ? +limit : this.DEFAULT_PAGE_LIMIT;

    const cacheId = `page ${pageNumber} - limit ${limitNumber}`;

    const cachedResponse = localStorage.getItem(cacheId);
    this.stateService.updateState({
      currentPage: pageNumber,
      pageLimit: limitNumber
    })

    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    if (!!this._peopleData$.value) {
      return this.dataService.fetchPeople(pageNumber, limitNumber).pipe(
        tap((data: People[]) => localStorage.setItem(cacheId, JSON.stringify(data))),
        tap((data: People[]) => this._peopleData$.next(data))
      )
    } else {
      return this.peopleData$;
    }
  }
}
