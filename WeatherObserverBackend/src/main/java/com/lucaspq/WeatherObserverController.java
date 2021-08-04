package com.lucaspq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;

import com.lucaspq.dtos.KeyAndObservedCityDTO;
import com.lucaspq.error.UserNotFoundException;
import com.lucaspq.models.ObservedCity;
import com.lucaspq.models.User;

@RestController
@CrossOrigin
@Api(value = "Weather Observer Demo System")
public class WeatherObserverController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private WeatherService weatherService;

    // Find All
    @ApiOperation(value = "Get all users and their respective cities.",
                  notes = "NOTE: Weather data is not updated. You need to get per user using the GET method.")
    @GetMapping("/users/")
    List<User> findAll() {
        return repository.findAll();
    }

    // Find by Email
    @ApiOperation(value = "Get observed cities by Email",
                  notes = "Response only cities with an active time period and associated with the given email. \n" +
                  "A time period is active if current time is between a start date and time and end date and time.")
    @GetMapping("/users/{email}")
    List<ObservedCity> findOne(@PathVariable String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        List<ObservedCity> activeCities = new ArrayList<>();
        for (ObservedCity observedCity : user.getListObservedCity()) {
            if (observedCity.active())
                activeCities.add(weatherService.fillWeather(observedCity));
        }
        
        return activeCities;
    }

    // Add Observed City
    @ApiOperation(value = "Add observed city",
                  notes = "Register a given city for a selected time period.")
    @PostMapping("/users/add-observedcity")
    @ResponseStatus(HttpStatus.CREATED)
    User newObservedCity(@RequestBody KeyAndObservedCityDTO dto) {
        String email = dto.getUserKey();
        ObservedCity observedCity = dto.getObservedCity();
        User user = repository.findByEmail(email)
                        .orElse(new User(email));
        user.addObservedCity(observedCity);
        return repository.save(user);
    }

}
