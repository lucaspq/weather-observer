import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './components/add-city/add-city.component';
import { AuthGuard } from './guards/auth.guard';
import { CitiesComponent } from './pages/cities/cities.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/cities', pathMatch: 'full' },
  { path: 'cities', component: CitiesComponent, canActivate: [AuthGuard] },
  // { path: 'addcity', component: AddCityComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
