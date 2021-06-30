import { Injectable } from '@angular/core';
import { ObservedCity } from '../models/observed-city';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new Map<string, ObservedCity[]>();
  loggedUser: string;

  private _isAuthenticated: boolean;

  constructor(
    private weatherService: WeatherService
  ) {
    this._isAuthenticated = false;
  }

  authenticate() {
    this._isAuthenticated = true;
  }

  public get isAuthenticated(): boolean{
    return this._isAuthenticated;
  }

  addObservedCity(observedCity: ObservedCity) {
    console.log("Inserting observed city: " + observedCity.city);
    const userKey = this.loggedUser;

    if ( this.users.has(userKey) ) {
      this.users.get(userKey).push(observedCity);
    } else {
      this.users.set(userKey, [observedCity]);
    }

    this.weatherService.addWeather(observedCity.city).subscribe( () => {
      alert(`City ${observedCity.city} successfully!`);
    });
    console.log(this.users);
  }

  getObservedCities(): ObservedCity[] {
    return this.users.get(this.loggedUser);
  }

  logout() {
    this._isAuthenticated = false;
    this.loggedUser = '';
  }

}
