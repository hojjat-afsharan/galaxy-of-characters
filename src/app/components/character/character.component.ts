import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
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
  faChevronLeft,
  faChevronRight,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { RouteInitial } from "src/app/app-routing.module";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent implements OnDestroy {
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
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;
  public faSeedling = faSeedling;
  public characterId = 0;
  public GENDER = Gender;
  car: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private stateService: StateService
  ) {
    this.subscription.add(
      this.stateService.state$.subscribe((state: State) => {
        this.state = state;
      })
    );

    this.subscription.add(
      this.route.params.subscribe((params: any) => {
        this.characterService.getData(params as CharacterPageParams);
      })
    );
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
