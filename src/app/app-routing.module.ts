import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { PeopleComponent } from './components/people/people.component';
import { CharacterResolverService } from './services/character-resolver.service';
import { PeopleResolverService } from './services/people-resolver.service';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    resolve: {
      data: PeopleResolverService
    }
  },
  {
    path: 'people/:uid',
    component: CharacterComponent,
    resolve: {
      data: CharacterResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
