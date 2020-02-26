import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ResultsComponent } from './results/results.component';
import { JoinComponent } from './join/join.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [HomeComponent, SearchComponent, ProfileComponent, CreateActivityComponent, ResultsComponent, JoinComponent, EditProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AgmCoreModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class PagesModule { }
