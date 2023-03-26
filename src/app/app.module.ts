import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
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
  providers: []
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) {
    
  }






  ngDoBootstrap(appRef: ApplicationRef): void {
    const galaxyCustomElement = createCustomElement(PeopleComponent, {injector: this.injector});
    window.customElements.define('star-wars-galaxy', galaxyCustomElement);

    const characterCustomElement = createCustomElement(CharacterComponent, {injector: this.injector});
    window.customElements.define('star-wars-character', characterCustomElement);

    const planetCustomElement = createCustomElement(PlanetComponent, {injector: this.injector});
    window.customElements.define('star-wars-planet', planetCustomElement);
  }

 }
