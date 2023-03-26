import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouteInitial } from 'src/app/app-routing.module';
import { State } from 'src/app/shared/state-manager/models/state.model';
import { StateService } from 'src/app/shared/state-manager/state.service';
import {
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnDestroy {
  
  public state?: State;
  public subscription = new Subscription();

  public faChevronleft = faChevronLeft;

  constructor( private router: Router,
    private stateService: StateService) {
      this.subscription.add(this.stateService.state$.subscribe((state: State) => this.state = state));
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  gotoList() {

    this.router.navigate([RouteInitial.PEOPLE]);
    }
}
