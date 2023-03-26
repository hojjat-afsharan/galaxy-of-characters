import { Component } from '@angular/core';
import { State } from './shared/state-manager/models/state.model';
import { StateService } from './shared/state-manager/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  public state?: State;
  title = 'galaxy-of-characters';
  constructor(private stateService: StateService) {
  }
}
