import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import {
  State,
} from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import {
  DEFAULT_PEOPLE_LIST_PARAMS,
  People,
  PeoplePageParams,
  PeopleResponse,
} from "../models/people.model";
import { PeopleDataService } from "./people-data.service";

@Injectable({
  providedIn: "root",
})
export class PeopleService implements OnDestroy {
  private _people$ = new BehaviorSubject<People[]>([]);
  public people$ = this._people$.asObservable();

  private _lastPage$ = new BehaviorSubject<boolean>(false);
  public lastPage$ = this._lastPage$.asObservable();

  private subscription = new Subscription();

  constructor(
    private stateService: StateService,
    private peopleDataService: PeopleDataService,
  ) {
  }

  public getPeopleDataService(): PeopleDataService {
    return this.peopleDataService;
  }

  public getData(params: PeoplePageParams) {
          this.getPeople(params.page, params.limit)
            .subscribe((people: People[]) => this._people$.next(people));
  }

  public getPeople(
    page: number = DEFAULT_PEOPLE_LIST_PARAMS.currentPage,
    limit: number = DEFAULT_PEOPLE_LIST_PARAMS.limit
  ): Observable<People[]> {

   
    const totalPages = this.getCachedState()?.totalPages;
    
    if (totalPages) {
      this._lastPage$.next(totalPages === Number(page));
    }

    const cacheId = `page ${page} - limit ${limit}`;
    const cachedResponse = this.checkCachedData(cacheId);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.peopleDataService.fetchPeople(page, limit).pipe(
      tap((response: PeopleResponse) =>
        {
          this.updatePeopleState(response, page, limit);
          this._lastPage$.next(response.total_pages === +page);
        }
      ),
      map((response: PeopleResponse) =>
        response.results.map((item) => new People(item))
      ),
      tap((data: People[]) => { 
        localStorage.setItem(cacheId, JSON.stringify(data));
        this.updateKnownPeopleUids(data);
        this._people$.next(data);
      })
    );
  }

  getCachedState(): Partial<State> {
    const initialValues = localStorage.getItem("maxValues");
    if (initialValues ) {
      const partialState = JSON.parse(initialValues) as State;
      this.stateService.updateState(partialState);
      return partialState;
    }
    return {};
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }

  public updatePeopleState(
    response: PeopleResponse,
    pageNumber: number,
    pageLimit: number
  ): void {
    const newState: Partial<State> = {
      totalRecords: response.total_records,
      totalPages: response.total_pages,
    };
    this.stateService.updateState({
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      previous: response.previous,
      next: response.next,
      currentPage: +pageNumber,
      itemsLimit: pageLimit,
    });

    localStorage.setItem("maxValues", JSON.stringify(newState));
  }

  private updateKnownPeopleUids(people: People[]) {
    let uidList: number[] = [];
    people.forEach((people: People) => uidList.push(+people.uid));
    this.stateService.updateKnownUids(uidList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cleanData() {
    this._people$.next([]);
  }
}
