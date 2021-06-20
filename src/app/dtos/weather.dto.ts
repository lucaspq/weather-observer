import { Weather } from "../models/weather";

export class WeatherDto {

    convertResponseToWeather(data: any): Weather {
        const newWeather = new Weather();
        newWeather.city = data.name;
        newWeather.description = data.weather[0].description;
        newWeather.temperature = data.main.temp;
        return newWeather;
    }
}
