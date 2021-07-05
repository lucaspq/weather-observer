import { Weather } from "../models/weather";

export class WeatherDto {

    convertResponseToWeather(data: any): Weather {
        const newWeather = new Weather();
        newWeather.city = data.name;
        newWeather.description = data.weather[0].description;
        newWeather.icon = data.weather[0].icon;
        newWeather.temperature = data.main.temp;
        newWeather.obsDateTime = new Date(Number(data.dt)*1000);
        return newWeather;
    }
}
