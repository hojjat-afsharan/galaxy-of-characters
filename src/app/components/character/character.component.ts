import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CharacterPageParams, Gender } from "src/app/components/character/models/character.model";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { CharacterService } from "./services/character.service";
import { faEye, faMars, faVenus, faVenusMars, faTableList, faJedi, faHand, faChevronLeft, faChevronRight,
  faSeedling} from '@fortawesome/free-solid-svg-icons';

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
  public firstChar = false;
  public lastChar = false;

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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private stateService: StateService) {
      this.subscription.add(this.stateService.state$.subscribe((state: State) =>{ 
        this.state = state;
        const indexOfCurrentChar = state.uidList?.findIndex((i) => i === this.state?.currentSelectedCharacter);
        this.firstChar = indexOfCurrentChar === 0;
        this.lastChar = state.totalRecords === indexOfCurrentChar;
      }));

      this.subscription.add(this.route.params.subscribe((params: any) => {
        console.log(params)
        this.characterService.getData(params as CharacterPageParams);
      }));
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.characterService.cleanData();
  }

  // public navigate(whichDirection: number, charactedId: number) {

  //   this.isLoading = true;
  //   console.log('1 - updating state');
  //   const uidList = this.state?.uidList;
  //   const currentCharacterIndex = uidList?.findIndex((i) => i === this.characterId);
  //   const nextCharacterId = uidList ? uidList[(currentCharacterIndex ?? 0) + whichDirection] : 1;

  //   this.stateService.updateState({currentSelectedCharacter: nextCharacterId});
    
  //   this.router.navigate(['/people', this.state?.currentSelectedCharacter])
  //   .finally(() => setTimeout(() => this.isLoading = false) )
  // }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }

  gotoList() {
    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit}
      });
    }

    gotoPlanet(planetNumber: number = 1) {
      this.router.navigate(['/planets', planetNumber]
        );
      }
}
