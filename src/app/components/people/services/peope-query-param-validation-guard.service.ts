import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { State } from 'src/app/shared/state-manager/models/state.model';
import { StateService } from 'src/app/shared/state-manager/state.service';
import { People } from '../models/people.model';
import { PeoplePageParams, PeopleService } from './people.service';

@Injectable({
  providedIn: 'root'
})
export class PeopeQueryParamValidationGuardService implements CanActivate{

  private state?: State;
  constructor(private router: Router, private stateService: StateService,
    private peopleService: PeopleService) { 
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const queryParams = route.queryParams;

     return this.stateService.state$.pipe(
        switchMap((data: State) => {
          console.log(data);

          return of(true);
        })
    )

    return of(true);
  }
}
