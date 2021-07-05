import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatNativeDateModule} from '@angular/material/core';
import {ImportMaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CitiesComponent,
    PageNotFoundComponent,
    AddCityComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    ImportMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
