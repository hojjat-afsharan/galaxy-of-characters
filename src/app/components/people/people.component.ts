import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Router } from "@angular/router";
import { StateService } from "src/app/shared/state-manager/state.service";
import { State } from "src/app/shared/state-manager/models/state.model";
import { PeopleService } from "./services/people.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent implements OnDestroy {
  public people$ = this.peopleService.people$;
  public state?: State;
  isLoading = false

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
    private stateService: StateService
  ) {
    this.subscription.add(this.stateService.state$.subscribe((state: State) => 
    this.state = state));

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  public navigate(whichDirection: number) {

    this.isLoading = true;
    console.log('3 - updating state');
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
    console.log('4 - updating state');
    this.stateService.updateState({
      currentSelectedCharacter: uid
    });
  }
}
