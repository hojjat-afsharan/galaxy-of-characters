import { Component } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { map, Observable } from "rxjs";
import { People, PeopleResponse } from "src/app/models/people.model";
import { Router } from "@angular/router";
import { StateService } from "src/app/services/state.service";
import { State, STATE_INITIAL_VALUE } from "src/app/models/state.model";
import { PeopleResolverService } from "src/app/services/people-resolver.service";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent {
  public people$ = new Observable<People[]>();
  public state?: State;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {
    this.stateService.state$.subscribe((state: State) => (this.state = state));
  }

  ngOnInit() {
    this.people$ = this.route.data.pipe(map(({ data }) => data));
  }

  public navigate(whichDirection: number) {

    this.stateService.updateState({
      currentPage: (this.state?.currentPage ?? 1) + whichDirection
    });

    this.router.navigate([], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.pageLimit},
      relativeTo: this.route,
      });
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }
}
