import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PeopleComponent } from "./components/people/people.component";
import { PlanetComponent } from "./components/planet/planet.component";

export enum RouteInitial {
  PEOPLE = '/people',
  PLANET = '/planets'
}

const routes: Routes = [
  
  {
    path: "people/:uid",
    component: CharacterComponent,
    runGuardsAndResolvers: "always",
  },
  {
    path: "planets/:uid",
    component: PlanetComponent,
    runGuardsAndResolvers: "always",
  },
  {
    path: "people",
    component: PeopleComponent,
    // canActivate: [PeopeQueryParamValidationGuardService ],
    data: {
      queryParams: ['page', 'limit'],
    },
    runGuardsAndResolvers: "always",
  },
  {
    path: "",
    redirectTo: "people",
    pathMatch: "full",
  },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
