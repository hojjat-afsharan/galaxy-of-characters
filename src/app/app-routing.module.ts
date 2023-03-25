import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PeopleComponent } from "./components/people/people.component";
import { PeopeQueryParamValidationGuardService } from "./components/people/services/peope-query-param-validation-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "people",
    pathMatch: "full",
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
    path: "people/:uid",
    component: CharacterComponent,
    runGuardsAndResolvers: "always",
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
