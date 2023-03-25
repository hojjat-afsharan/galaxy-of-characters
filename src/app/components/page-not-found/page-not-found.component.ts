import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/state-manager/models/state.model';
import { StateService } from 'src/app/shared/state-manager/state.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  
  public state?: State;

  constructor( private router: Router,
    private stateService: StateService) {
      this.stateService.state$.subscribe((state: State) => this.state = state);
    }

  gotoList() {

    this.router.navigate(['/people'], { 
      queryParams: {page: this.state?.currentPage, limit: this.state?.itemsLimit}
      
      });
    }
}
