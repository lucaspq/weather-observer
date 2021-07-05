const express = require('express');
const app = express();

const userRoute = express.Router();
let weatherService = require('../weather');
let User = require('../model/User');


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
      res.json(data)
    }
  })
})

// Get Observed Cities by Userkey
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