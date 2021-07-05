import { Component, OnInit } from '@angular/core';
import { ObservedCity } from 'src/app/models/observed-city';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  _weathers: ObservedCity[];

  constructor(
    private userService: UserService
  ) {
    this._weathers = [];
   }

  get weathers() {
    return this._weathers;
  }

  ngOnInit(): void {
    this._weathers = [];
    this.loadWeathers();
  }

  loadWeathers() {
    this.userService.GetObservedCities(this.userService.loggedUser)
    .subscribe( observedCities => {
      console.log(observedCities);
      this._weathers = observedCities;
    }, (err) => {
      console.log(err);
    });
  }
}
