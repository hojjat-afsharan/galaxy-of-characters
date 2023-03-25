import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { State } from 'src/app/shared/state-manager/models/state.model';
import { StateService } from 'src/app/shared/state-manager/state.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnDestroy {
  
  public state?: State;
  public subscription = new Subscription();

  constructor( private router: Router,
    private stateService: StateService) {
      this.subscription.add(this.stateService.state$.subscribe((state: State) => this.state = state));
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  gotoList() {

    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit}
      
      });
    }
}
