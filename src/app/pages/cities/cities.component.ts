import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cities = ['Fortaleza', 'Sao Paulo', 'New York', 'Colorado'];

  constructor(
    private weatherService: WeatherService
  ) { }

  get weathers() {
    return this.weatherService.allWeathers;
  }

  ngOnInit(): void {
    this.loadWeathers();
  }

  loadWeathers() {
    this.cities.forEach( (city: string) => {
      this.addObservedCity(city);
    })
  }

  private addObservedCity(city: string) {
    this.weatherService.addWeather(city).subscribe( () => {
      console.log(`City ${city} successfully added!`);
    });
  }

}
