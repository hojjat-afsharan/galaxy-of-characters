import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { of } from "rxjs";
import { People } from "../models/people.model";
import { PeopleService } from "../services/people.service";

@Injectable({
  providedIn: "root",
})
export class PeopleResolverService implements Resolve<People[]> {
  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_LIMIT = 10;

  constructor(
    private peopleService: PeopleService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const page = route.queryParams["page"];
    const limit = route.queryParams["limit"];

    return of([]);
    //  this.peopleService.getPeople(page ? +page : this.DEFAULT_PAGE, limit ? +limit : this.DEFAULT_PAGE_LIMIT)
  }
}
