import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { State, STATE_INITIAL_VALUE } from './models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private _state$ = new ReplaySubject<State>(1);
  public state$ = this._state$.asObservable();

  public updateState(newState: State): void {
    // const currentState = this._state$.getValue();
    const nextState = {...newState };
    this._state$.next(nextState);
  }

  public updateKnownUids(newUids: number[], newState: State) {
    if(this.state$) {
    newState.uidList = [...newState.uidList, ...newUids].sort((a, b) => a > b ? 1:-1);
    const nextState = { ...newState} as State;
    this._state$.next(nextState);
  }
}

  // public getState(): State {
  //   return this._state$.getValue();
  // }
}
