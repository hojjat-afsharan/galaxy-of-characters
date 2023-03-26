import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Router } from "@angular/router";
import { StateService } from "src/app/shared/state-manager/state.service";
import { State } from "src/app/shared/state-manager/models/state.model";
import { PeopleService } from "./services/people.service";
import { Subscription } from "rxjs";
import { RouteInitial } from "src/app/app-routing.module";
import { PeoplePageParams } from "./models/people.model";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent implements OnDestroy {
  public people$ = this.peopleService.people$;
  public lastPage$ = this.peopleService.lastPage$;
  public state?: State;
  isLoading = false;
  public currentPage = 1;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
    private stateService: StateService
  ) {
    this.subscription.add(
      this.stateService.state$.subscribe((state: State) => (this.state = state))
    );

    this.subscription.add(
      this.route.queryParams.subscribe((params: any) => {
        console.log(params)
      const pageParams = params as PeoplePageParams;
      this.currentPage = pageParams.page;
      this.peopleService.getData(pageParams);
    }
    ));
  }



  ngOnInit() {}

  navigateToCharacter(characterNumber: string) {
    this.updateSelectedCharacter(+characterNumber);
    this.router.navigate([RouteInitial.PEOPLE, characterNumber]);
  }

  public navigatePreNext(whichDirection: number) {
    this.isLoading = true;
    this.stateService.updateState({
      currentPage: +(this.state?.currentPage ?? 1) + whichDirection,
    });

    this.router
      .navigate([], {
        queryParams: {
          page: this.state?.currentPage,
          limit: this.state?.itemsLimit,
        },
      })
      .finally(() => (this.isLoading = false));
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.peopleService.cleanData();
  }
}
