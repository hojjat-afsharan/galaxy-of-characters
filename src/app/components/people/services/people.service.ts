import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from "rxjs";
import { State, STATE_INITIAL_VALUE } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { People, PeopleResponse } from "../models/people.model";
import { PeopleDataService } from "./people-data.service";

export interface PeoplePageParams {
  page: number,
  limit: number
}

@Injectable({
  providedIn: "root",
})
export class PeopleService {

  private _people$ = new BehaviorSubject<People[]>([]);
  public people$ = this._people$.asObservable();

  private state: State = STATE_INITIAL_VALUE;
  
  constructor(
    private stateService: StateService,
    private peopleDataService: PeopleDataService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.getData();
this.stateService.state$.subscribe((state) => this.state = state);

  }

  public getData() {
    this.route.queryParams.pipe(
      switchMap((params) => 
           this.getPeople((params as PeoplePageParams).page, (params as PeoplePageParams).limit)
        ),
      tap((item: People[]) => this._people$.next(item)))
      .subscribe();
  }

  public getPeople(page: number = 1, limit: number = 10): Observable<People[]> {
    const cacheId = `page ${page} - limit ${limit}`;

    const cachedResponse = this.checkCachedData(cacheId);

    this.getCachedState();

    if (cachedResponse) {
      this.stateService.updateState({
        currentPage: page,
        itemsLimit: limit,
      });
      return of(JSON.parse(cachedResponse));
    }

    return this.peopleDataService.fetchPeople(page, limit).pipe(
      tap((response: PeopleResponse) =>
        this.updatePeopleState(response, page, limit)
      ),
      map((response: PeopleResponse) =>
        response.results.map((item) => new People(item))
      ),
      tap((data: People[]) =>
        localStorage.setItem(cacheId, JSON.stringify(data))
      ),
      tap((data: People[]) => this.updateKnownPeopleUids(data)),
      tap((item: People[]) => this._people$.next(item))
    );
  }
  getCachedState() {
    const maxValues = localStorage.getItem('maxValues');
    if(maxValues) {
      this.stateService.updateState(JSON.parse(maxValues) as State);
    }
  }

  checkCachedData(cacheId: string): string | null {
    const cachedResponse = localStorage.getItem(cacheId);
    return cachedResponse;
  }

  private updatePeopleState(
    response: PeopleResponse,
    pageNumber: number,
    pageLimit: number
  ): void {
    const newState: Partial<State> = {
      totalRecords: response.total_records,
      totalPages: response.total_pages
    }
    this.stateService.updateState({
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      previous: response.previous,
      next: response.next,
      currentPage: pageNumber,
      itemsLimit: pageLimit,
    });

    localStorage.setItem('maxValues', JSON.stringify( newState));
  }

  private updateKnownPeopleUids(people: People[]) {
    let uidList: number[] = [];

    people.forEach((people: People) => uidList.push(+people.uid));
    const newState = Object.assign({...this.state}, {uidList});
    this.stateService.updateKnownUids((newState as State).uidList, 
    this.state);
  }
}
