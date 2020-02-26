import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BurgerMenuComponent} from './burger-menu/burger-menu.component';
import {AddButtonComponent} from './add-button/add-button.component';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    BurgerMenuComponent,
    ActivityInfoComponent,
    AddButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    ActivityInfoComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BurgerMenuComponent,
    AddButtonComponent
  ]
})
export class SharedModule { }
