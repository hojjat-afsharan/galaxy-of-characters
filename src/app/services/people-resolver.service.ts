import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { People } from '../models/people.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleResolverService implements Resolve<People[]> {

  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_PAGE_LIMIT = 10;

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route.queryParamMap.get('page');
    const limit = route.queryParamMap.get('limit');
    return this.dataService.fetchPeople((page ? + page: this.DEFAULT_PAGE), limit ? +limit : this.DEFAULT_PAGE_LIMIT).pipe(
      tap(item => console.log(item))
    );
  }
}
