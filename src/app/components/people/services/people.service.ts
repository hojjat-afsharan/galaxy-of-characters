import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from "rxjs";
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

  
  constructor(
    private stateService: StateService,
    private peopleDataService: PeopleDataService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.getData();
  }

  public getData() {
    this.route.queryParams.pipe(
      tap((item) => console.log(item)),
      switchMap((params) => 
           this.getPeople((params as PeoplePageParams).page, (params as PeoplePageParams).limit)
        ),
      tap((item) => console.log(item)),
      tap((item: People[]) => this._people$.next(item)))
      .subscribe();
  }

  private getPeople(page: number = 1, limit: number = 10): Observable<People[]> {
    console.log(page, limit);
    const cacheId = `page ${page} - limit ${limit}`;

    const cachedResponse = this.checkCachedData(cacheId);

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
      tap((data: People[]) => this.updateKnownPeopleUids(data))
    );
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
    this.stateService.updateState({
      totalRecords: response.total_records,
      totalPages: response.total_pages,
      previous: response.previous,
      next: response.next,
      currentPage: pageNumber,
      itemsLimit: pageLimit,
    });
  }

  private updateKnownPeopleUids(people: People[]) {
    let uidList: number[] = [];

    people.forEach((people: People) => uidList.push(+people.uid));
    this.stateService.updateKnownUids(uidList);
  }
}
