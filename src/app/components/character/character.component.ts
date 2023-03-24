import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Character, CharacterProperties } from 'src/app/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  public character$ = new Observable<CharacterProperties | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.character$ = (this.route.data).pipe(
      map(({data}) => data),
      map((data: Character) => data.properties? data.properties : null)
    );
  }
}
