import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RoutesRecognized } from '@angular/router';
import {  Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { PreviousRouteService } from 'src/app/shared/services/previous-route.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {
  previousUrl: string | undefined;

  private subscription = new Subscription();

  constructor(private router: Router,
    private previousRouteService: PreviousRouteService) {
  }

  ngOnInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigate() {
    this.router.navigate([this.previousUrl]);
  }
}
