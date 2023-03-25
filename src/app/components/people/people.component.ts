import { Component } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { map, Observable } from "rxjs";
import { People, PeopleResponse } from "src/app/components/people/models/people.model";
import { Router } from "@angular/router";
import { StateService } from "src/app/shared/state-manager/state.service";
import { State, STATE_INITIAL_VALUE } from "src/app/shared/state-manager/models/state.model";

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent {
  public people$ = new Observable<People[]>();
  public state?: State;
  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {
    this.stateService.state$.subscribe((state: State) => 
    {this.state = state;
    console.log(state)});
  }

  ngOnInit() {
    this.people$ = this.route.data.pipe(map(({ data }) => data));
  }

  public navigate(whichDirection: number) {
    this.isLoading = true;
    this.stateService.updateState({
      currentPage: (this.state?.currentPage ?? 1) + whichDirection
    });

    this.router.navigate([], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.pageLimit},
      relativeTo: this.route,
      
      }).finally(() => this.isLoading = false);
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }
}
