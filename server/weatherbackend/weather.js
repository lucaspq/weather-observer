// weather.js
// ========
const axios = require('axios');
const apiKey = '4d524ca0be73afecaadfc98ec51bdaf1';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const units = 'metric';

module.exports = {
//   _weathers = [],
//   private _weathers: Weather[] = [];
//   private weatherDto = new WeatherDto();

//   get allWeathers() {
//     return this._weathers;
//   }

//   clear: function() {
//     this._weathers = [];
//   },

//   addWeather: function(city) {
//     const url = `${this.baseUrl}?q=${city}&units=${this.units}&appid=${this.apiKey}`;
//     return this.http.get(url).pipe(
//       map( (res) => {
//         this._weathers.push(this.weatherDto.convertResponseToWeather(res));
//       })
//     );
//   }
    getWeather: function(city) {
        const url = `${baseUrl}?q=${city}&units=${units}&appid=${apiKey}`;
        return axios.get(url);
    }

}
