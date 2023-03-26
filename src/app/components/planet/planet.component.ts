import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { distinctUntilChanged, switchMap } from "rxjs/operators";
import { RouteInitial } from "src/app/app-routing.module";
import { BreakpointEnum, ResponsivenessService } from "src/app/shared/services/responsiveness.service";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { PlanetPageParams } from "./model/planet.model";
import { PlanetService } from "./services/planet.service";
import {
  faRocket,
  faChevronLeft,
  faR
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-planet",
  templateUrl: "./planet.component.html",
  styleUrls: ["./planet.component.scss"],
})
export class PlanetComponent implements OnInit, OnDestroy {
  public planet$ = this.planetService.planet$;
  private subscription = new Subscription();
  public state?: State;
  public breakpointEnum = BreakpointEnum;
  breakpoint: BreakpointEnum = BreakpointEnum.SM;

  public faRocket = faRocket;
  public faChevronLeft = faChevronLeft;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planetService: PlanetService,
    private stateService: StateService,
    public responsivenessService: ResponsivenessService,
    private changeDetector: ChangeDetectorRef
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

    this.subscription.add(this.responsivenessService.breakpointObservable$.pipe(
      distinctUntilChanged()
    ).subscribe((data) => {
      console.log(data);
      this.breakpoint = data;
      this.changeDetector.detectChanges()}));
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
