import { Injectable } from '@angular/core';
import { ObservedCity } from '../models/observed-city';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new Map<string, ObservedCity[]>();

  constructor() {  }

  addObservedCity(userKey: string, observedCity: ObservedCity) {
    console.log("Inserting observed city: " + observedCity.city);
    if ( this.users.has(userKey) ) {
      this.users.get(userKey).push(observedCity);
    } else {
      this.users.set(userKey, [observedCity]);
    }
    console.log(this.users);
  }

}
