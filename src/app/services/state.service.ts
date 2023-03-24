import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State, STATE_INITIAL_VALUE } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private _state$ = new BehaviorSubject<State>(STATE_INITIAL_VALUE);
  public state$ = this._state$.asObservable();

  public updateState(newState: Partial<State>): void {
    const currentState = this._state$.getValue();
    const nextState = { ...currentState, ...newState };
    this._state$.next(nextState);
  }
}
