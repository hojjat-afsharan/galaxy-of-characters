import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { distinctUntilChanged, Subscription, tap } from "rxjs";
import {
  CharacterPageParams,
  Gender,
} from "src/app/components/character/models/character.model";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { CharacterService } from "./services/character.service";
import {
  faEye,
  faMars,
  faVenus,
  faVenusMars,
  faTableList,
  faJedi,
  faHand,
  faSeedling,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { RouteInitial } from "src/app/app-routing.module";
import { BreakpointEnum, ResponsivenessService } from "src/app/shared/services/responsiveness.service";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent implements OnDestroy, OnInit{

  public character$ = this.characterService.cahracter$;

  public state?: State;
  public isLoading = false;
  public subscription = new Subscription();

  public faEye = faEye;
  public faMars = faMars;
  public faVenus = faVenus;
  public faVenusMars = faVenusMars;
  public faTableList = faTableList;
  public faJedi = faJedi;
  public faHand = faHand;
  public faChevronleft = faChevronLeft;
 
  public faSeedling = faSeedling;
  public characterId = 0;
  public GENDER = Gender;
  car: any;

  public breakpointEnum = BreakpointEnum;
  breakpoint: BreakpointEnum = BreakpointEnum.SM;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private stateService: StateService,
    public responsivenessService: ResponsivenessService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscription.add(
      this.stateService.state$.subscribe((state: State) => this.state = state)
    );

    this.subscription.add(
      this.route.params.subscribe((params: any) => {
        this.characterService.getData(params as CharacterPageParams);
      })
    );
  }

  ngOnInit() {
    this.subscription.add(this.responsivenessService.breakpointObservable$.pipe(
      distinctUntilChanged()
    ).subscribe((data) => {
      console.log(data);
      this.breakpoint = data;
      this.changeDetector.detectChanges()}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.characterService.cleanData();
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid,
    });
  }

  gotoList() {
    this.router.navigate([RouteInitial.PEOPLE], {
      queryParams: {
        page: this.state?.currentPage,
        limit: this.state?.itemsLimit,
      },
    });
  }

  gotoPlanet(planetNumber: number = 1) {
    this.router.navigate([RouteInitial.PLANET, planetNumber]);
  }
}
