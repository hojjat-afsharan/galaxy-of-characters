import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { RouteInitial } from "src/app/app-routing.module";
import { PreviousRouteService } from "src/app/shared/services/previous-route.service";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { PlanetPageParams } from "./model/planet.model";
import { PlanetService } from "./services/planet.service";

@Component({
  selector: "app-planet",
  templateUrl: "./planet.component.html",
  styleUrls: ["./planet.component.scss"],
})
export class PlanetComponent implements OnInit, OnDestroy {
  public planet$ = this.planetService.planet$;
  private subscription = new Subscription();
  public state?: State;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planetService: PlanetService,
    private stateService: StateService
  ) {
    this.subscription.add(
      this.stateService.state$.subscribe((state: State) => (this.state = state))
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe((params: any) =>
        this.planetService.getData(params as PlanetPageParams)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.planetService.cleanData();
  }

  public navigate() {
    console.log(this.state?.currentSelectedCharacter);
    this.router.navigate([
      RouteInitial.PEOPLE,
      this.state?.currentSelectedCharacter,
    ]);
  }
}
