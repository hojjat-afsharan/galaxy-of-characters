import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { Character, CharacterProperties } from "src/app/models/character.model";
import { State } from "src/app/models/state.model";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent {
  
  public character$ = new Observable<CharacterProperties | null>();
  public state?: State;
  public isLoading = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService) {
      this.stateService.state$.subscribe((state: State) => this.state = state);
    }

  ngOnInit() {
    this.character$ = this.route.data.pipe(
      map(({ data }) => data),
      map((data: Character) => (data.properties ? data.properties : null))
    );
  }

  public navigate(whichDirection: number) {

    this.isLoading = true;
    this.stateService.updateState({
      currentSelectedCharacter: (this.state?.currentSelectedCharacter ?? 1) + whichDirection
    });

    this.router.navigate(['/people', this.state?.currentSelectedCharacter]).finally(() => this.isLoading = false)
  }

  public updateSelectedCharacter(uid: number) {
    this.stateService.updateState({
      currentSelectedCharacter: uid
    })
  }

  gotoList() {
    this.isLoading = true;

    console.log(this.state);
    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.pageLimit}
      
      }).finally(() => this.isLoading = false);
    }
}
