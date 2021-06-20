import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  weathers: Weather[] = [];

  cities = ['Fortaleza', 'Sao Paulo', 'New York', 'Colorado'];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.loadWeathers();
  }

  loadWeathers() {
    this.cities.forEach( (city) => {
      this.weatherService.getWeather(city).subscribe( (res: Weather) => {
        console.log(res);
        this.weathers.push(res);
      });
    })
  }

}
