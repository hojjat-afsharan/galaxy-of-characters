import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PreviousRouteService } from 'src/app/shared/services/previous-route.service';
import { PlanetService } from './services/planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  previousUrl: string | undefined;
  public planet$ = this.planetService.planet$;
  private subscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteService,
    private planetService: PlanetService) {
  }

  ngOnInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    this.subscription.add(this.route.params.pipe(
      switchMap((params: any) => this.planetService.getData((params)))
     ).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigate() {
    this.router.navigate([this.previousUrl]);
  }
}
