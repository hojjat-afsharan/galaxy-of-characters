import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable, pairwise, Subscription, switchMap, tap } from "rxjs";
import { Character, CharacterProperties } from "src/app/components/character/models/character.model";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { CharacterService } from "./services/character.service";
import { faEye, faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons';

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

  public characterId = 0;

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
    }

  ngOnInit() {
    this.subscription.add(this.route.params.pipe(
      switchMap((params: any) => this.characterService.getData((params)))
     ).subscribe((data: Character) => this.characterId = data.uid ? +data.uid : 0));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigate(whichDirection: number) {

    this.isLoading = true;
    console.log('1 - updating state');
    const uidList = this.state?.uidList;
    const currentCharacterIndex = uidList?.findIndex((i) => i === this.characterId);
    const nextCharacterId = uidList ? uidList[(currentCharacterIndex ?? 0) + whichDirection] : 1;

    this.stateService.updateState({currentSelectedCharacter: nextCharacterId});
    
    const queryParams = { uid:  this.state?.currentSelectedCharacter};
    this.router.navigate(['/people', this.state?.currentSelectedCharacter])
    .finally(() => setTimeout(() => this.isLoading = false, 200) )
  }

  public updateSelectedCharacter(uid: number) {
    console.log('2 - updating state');
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }

  gotoList() {
    this.isLoading = true;
    console.log(this.state);
    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit}
      
      }).finally(() => this.isLoading = false);
    }
}
