import { Component } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Router } from "@angular/router";
import { StateService } from "src/app/shared/state-manager/state.service";
import { State } from "src/app/shared/state-manager/models/state.model";
import { PeopleService } from "./services/people.service";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent {
  public people$ = this.peopleService.people$;
  public state?: State;
  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
    private stateService: StateService
  ) {
    this.stateService.state$.subscribe((state: State) => 
    this.state = state);

  }

  ngOnInit() {
  }

  public navigate(whichDirection: number) {

    this.isLoading = true;
    this.stateService.updateState({
      currentPage: +(this.state?.currentPage ?? 1) + whichDirection
    });

    this.router.navigate([], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit},
      relativeTo: this.route,
      })
      .finally(() => this.isLoading = false);

  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }
}
