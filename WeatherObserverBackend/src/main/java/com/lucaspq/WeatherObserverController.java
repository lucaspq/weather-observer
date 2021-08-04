package com.lucaspq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import com.lucaspq.dtos.KeyAndObservedCityDTO;
import com.lucaspq.error.UserNotFoundException;
import com.lucaspq.models.ObservedCity;
import com.lucaspq.models.User;

@RestController
@CrossOrigin
public class WeatherObserverController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private WeatherService weatherService;

    // Find All
    @GetMapping("/users")
    List<User> findAll() {
        return repository.findAll();
    }

    // Find by Email
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
