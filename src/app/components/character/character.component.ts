import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, switchMap, tap } from "rxjs";
import { Character, CharacterProperties } from "src/app/components/character/models/character.model";
import { State } from "src/app/shared/state-manager/models/state.model";
import { StateService } from "src/app/shared/state-manager/state.service";
import { CharacterService } from "./services/character.service";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent {
  
  public character$ = this.characterService.cahracter$;
  public state?: State;
  public isLoading = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private stateService: StateService) {
      this.stateService.state$.subscribe((state: State) => this.state = state);
    }

  ngOnInit() {
     this.route.params.pipe(
      switchMap((params: any) => this.characterService.getData((params)))
     ).subscribe();
  }

  public navigate(whichDirection: number) {

    this.isLoading = true;
    this.stateService.updateState({
      currentSelectedCharacter: (this.state?.currentSelectedCharacter ?? 1) + whichDirection
    });

    const queryParams = { uid:  this.state?.currentSelectedCharacter};
    this.router.navigate(['/people', this.state?.currentSelectedCharacter])
    .finally(() => this.isLoading = false)
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }

  gotoList() {
    this.isLoading = true;
    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit}
      
      }).finally(() => this.isLoading = false);
    }
}
