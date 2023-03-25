import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { CharacterResolverService } from "./components/character/resolver/character-resolver.service";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { PeopleComponent } from "./components/people/people.component";
import { PeopleResolverService } from "./components/people/resolver/people-resolver.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "people",
    pathMatch: "full",
  },
  {
    path: "people",
    component: PeopleComponent,
    data: {
      queryParams: ["page", "limit"],
    },
    // resolve: {
    //   data: PeopleResolverService,
    // },
    runGuardsAndResolvers: "always",
  },
  {
    path: "people/:uid",
    component: CharacterComponent,
    resolve: {
      data: CharacterResolverService,
    },
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
