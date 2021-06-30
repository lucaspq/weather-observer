import { Component, OnInit } from '@angular/core';
import { ObservedCity } from 'src/app/models/observed-city';
import { UserService } from 'src/app/services/user.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private userService: UserService
  ) { }

  get weathers() {
    return this.weatherService.allWeathers;
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated)
      this.loadWeathers();
  }

  loadWeathers() {
    this.weatherService.clear();
    const observedCities = this.userService.getObservedCities();
    observedCities.forEach( (observedCity: ObservedCity) => {
      if (observedCity.active)
        this.addObservedCity(observedCity.city);
    })
  }

  private addObservedCity(city: string) {
    this.weatherService.addWeather(city).subscribe( () => {
      console.log(`City ${city} successfully added!`);
    });
  }

}
