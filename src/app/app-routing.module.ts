import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { PeopleResolverService } from './services/people-resolver.service';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    resolve: {
      data: PeopleResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
