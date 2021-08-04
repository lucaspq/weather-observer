package com.lucaspq;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucaspq.models.ObservedCity;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private static final String apiKey = "4d524ca0be73afecaadfc98ec51bdaf1";
    private static final String baseUrl = "http://api.openweathermap.org/data/2.5/weather";
    private static final String units = "metric";

    private RestTemplate restTemplate = new RestTemplate();
    private ObjectMapper objectMapper = new ObjectMapper();


    public ObservedCity fillWeather(ObservedCity observedCity) {
        String url = baseUrl + "?q=" + observedCity.getCity() + "&units=" + units + "&appid=" + apiKey;
 
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            observedCity.setDescription(root.path("weather").get(0).path("description").asText());
            observedCity.setIconId(root.path("weather").get(0).path("icon").asText());
            observedCity.setTemperature(BigDecimal.valueOf(root.path("main").path("temp").asDouble()));
            observedCity.setObsDateTime(new Date(Long.valueOf(root.path("dt").asLong())*1000));

            return observedCity;
            
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON Response from OpenWeatherMap API", e);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }


}
