import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {JoinComponent} from './join/join.component';
import {ResultsComponent} from './results/results.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'create',
    component: CreateActivityComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
