const express = require('express');
const app = express();

const userRoute = express.Router();
let weatherService = require('../weather');
let User = require('../model/User');


/**
 * @typedef ObservedCity
 * @property {string} city.required - City name
 * @property {string} startDateTime.required - Start date and time of observation
 * @property {string} endDateTime.required - End date and time of observation
 * @property {integer} temperature - Temperature. Unit: Celsius
 * @property {string} description - Weather condition
 * @property {integer} obsDateTime - Time of data calculation, unix, UTC
 * @property {string} icon - Weather icon id
 */

/**
 * @typedef User
 * @property {Array.<ObservedCity>} observedcities - List of Observed City
 * @property {string} _id - Internal parameter 
 * @property {string} userkey - User email
 * @property {string} __v - Internal parameter
 */

/**
 * @typedef Request
 * @property {string} userkey.required - User email
 * @property {ObservedCity.model} observedcity.required - ObservedCity
 */

/**
 * Response all users and their respective cities.
 * NOTE: Weather data is not updated. You need to get per user using the GET method.
 * @route GET /users/
 * @returns {Array.<User>} 200 - An array of user info
 */
// Get All User
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Add observed city
// Get All User
/**
 * Register a given city for a selected time period.
 * @route POST /users/add-observedcity
 * @param {Request.model} request.body.required
 */
userRoute.route('/add-observedcity/').post((req, res) => {
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    User.findOneAndUpdate(
      { userkey: req.body.userkey }, 
      { $push: { observedcities: req.body.observedcity }},
    options,
    (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).send();
    }
  })
})

// Get Observed Cities by Userkey
/**
 * Response only cities with an active time period and associated with the given email.
 * A time period is active if current time is between a start date and time and end date and time.
 * @route GET /users/{userkey}
 * @param {string} userkey.path.required - user's email.
 * @returns {Array.<ObservedCity>} 200 - An array of city weather info
 * @returns {Error}  404 - User not found
 */
userRoute.route('/:userkey').get((req, res) => {
    User.findOne(
    { userkey: req.params.userkey },
    (error, data) => {
    if (error) {
      return next(error)
    } else if(!data) {
      return res.status(404).send("No user matching email");
    } else {
      let responseWeather = [];
      const promises = [];
      
      if ( data.observedcities !== 'undefined' && data.observedcities != null) {
        data.observedcities.forEach( observedcity => {
          // active city
          const currentDateTime = new Date();
          if (currentDateTime >= new Date(observedcity.startDateTime)
              && currentDateTime <= new Date(observedcity.endDateTime)) {
            let weather = {};
            weather.city = observedcity.city;
            weather.startDateTime = observedcity.startDateTime;
            weather.endDateTime = observedcity.endDateTime;
            responseWeather.push(weather);
            promises.push(weatherService.getWeather(observedcity.city));
          }
        });
      
        Promise.all(promises).then((allResults) => {
          while( (resp = allResults.shift()) !== undefined ) {          
            weather = responseWeather.shift();
            weather.description = resp.data.weather[0].description;
            weather.icon = resp.data.weather[0].icon;
            weather.temperature = resp.data.main.temp;
            weather.obsDateTime = resp.data.dt;
            responseWeather.push(weather);
          }
          res.json(responseWeather);
      });
      }// endif
    }})
})

module.exports = userRoute;