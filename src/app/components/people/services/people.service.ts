import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";
import { StateService } from "src/app/shared/state-manager/state.service";
import { People, PeopleResponse } from "../models/people.model";
import { PeopleDataServiceService } from "./people-data-service.service";

@Injectable({
  providedIn: "root",
})
export class PeopleService {
  constructor(
    private stateService: StateService,
    private peopleDataService: PeopleDataServiceService
  ) {}

  public getPeople(page: number, limit: number) {
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
