import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { WeatherDto } from "src/app/dtos/weather.dto";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '4d524ca0be73afecaadfc98ec51bdaf1';
  baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';

  private weatherDto = new WeatherDto();

  constructor(
    private http: HttpClient
  ) { }

  getWeather(city: string) {
    const url = `${this.baseUrl}q=${city}&appid=${this.apiKey}`;
    return this.http.get(url).pipe(
      map( (res: any) => {
        return this.weatherDto.convertResponseToWeather(res);
      })
    );
  }

}
