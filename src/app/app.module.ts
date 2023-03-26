import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { PeopleComponent } from './components/people/people.component';
import { CharacterComponent } from './components/character/character.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlanetComponent } from './components/planet/planet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    CharacterComponent,
    PageNotFoundComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) {
    const galaxyCustomElement = createCustomElement(AppComponent, {injector: this.injector});
    window.customElements.define('galaxy', galaxyCustomElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    
  }

 }
