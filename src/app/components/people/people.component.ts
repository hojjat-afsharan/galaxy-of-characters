import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { People, PeopleResponse } from 'src/app/models/people.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  public people$ = new Observable<People[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.people$ = (this.route.data).pipe(
      map(({data}) => data)
    );
  }
}
