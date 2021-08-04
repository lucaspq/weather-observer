package com.lucaspq;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucaspq.dtos.KeyAndObservedCityDTO;
import com.lucaspq.models.ObservedCity;
import com.lucaspq.models.User;

import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // for restTemplate
@ActiveProfiles("test")
public class WeatherObserverControllerTest {

    private static final ObjectMapper om = new ObjectMapper();
    private static final long _1DAY = 24*3600*1000; // milliseconds in day

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private UserRepository mockRepository;

    @Before
    public void init() {
        User user = new User(1L, "test@email.com");
        when(mockRepository.findById(1L)).thenReturn(Optional.of(user));
    }

    @Test
    public void findUserEmailOK() throws JSONException, JsonProcessingException {

        User user = new User(1L, "test@email.com");
        Date currentDate = Calendar.getInstance().getTime();
        Date startDateTime = new Date(currentDate.getTime() - _1DAY);
        Date endDateTime = new Date(currentDate.getTime() + _1DAY);
        ObservedCity observedCity1 = new ObservedCity(1L, "City1", startDateTime, endDateTime);
        ObservedCity observedCity2 = new ObservedCity(2L, "City2", startDateTime, endDateTime);
        user.addObservedCity(observedCity1);
        user.addObservedCity(observedCity2);

        // Only active cities
        String expected = om.writeValueAsString(user.getListObservedCity());

        ObservedCity unActiveObservedCity = new ObservedCity(3L, "City3", startDateTime, startDateTime);
        user.addObservedCity(unActiveObservedCity);

        when(mockRepository.save(any(User.class))).thenReturn(user);

        ResponseEntity<String> response = restTemplate.getForEntity("/users/email@test.com", String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON_UTF8, response.getHeaders().getContentType());

        JSONAssert.assertEquals(expected, response.getBody(), false);

        verify(mockRepository, times(1)).findByEmail("email@test.com");

    }

    @Test
    public void find_allUser_OK() throws Exception {

        User user1 = new User(1L, "test1@email.com");
        User user2 = new User(2L, "test2@email.com");
        Date currentDate = Calendar.getInstance().getTime();
        Date startDateTime = new Date(currentDate.getTime() - _1DAY);
        Date endDateTime = new Date(currentDate.getTime() + _1DAY);
        ObservedCity observedCity1 = new ObservedCity(1L, "City1", startDateTime, endDateTime);
        ObservedCity observedCity2 = new ObservedCity(2L, "City2", startDateTime, endDateTime);
        ObservedCity observedCity3 = new ObservedCity(3L, "City3", startDateTime, endDateTime);
        ObservedCity observedCity4 = new ObservedCity(4L, "City4", startDateTime, endDateTime);
        user1.addObservedCity(observedCity1);
        user1.addObservedCity(observedCity2);
        user2.addObservedCity(observedCity3);
        user2.addObservedCity(observedCity4);
        when(mockRepository.save(any(User.class))).thenReturn(user1);
        when(mockRepository.save(any(User.class))).thenReturn(user2);

        List<User> users = Arrays.asList(user1, user2);

        when(mockRepository.findAll()).thenReturn(users);

        String expected = om.writeValueAsString(users);

        ResponseEntity<String> response = restTemplate.getForEntity("/users", String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        JSONAssert.assertEquals(expected, response.getBody(), false);

        verify(mockRepository, times(1)).findAll();
    }

    @Test
    public void find_UserNotFound_404() throws Exception {

        String expected = "{status:404,error:\"Not Found\",message:\"User email not found : a@a\",path:\"/users/a@a\"}";

        ResponseEntity<String> response = restTemplate.getForEntity("/users/a@a", String.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        JSONAssert.assertEquals(expected, response.getBody(), false);

    }

    @Test
    public void add_ObservedCity_OK() throws Exception {

        User user = new User(1L, "test@email.com");
        Date currentDate = Calendar.getInstance().getTime();
        Date startDateTime = new Date(currentDate.getTime() - _1DAY);
        Date endDateTime = new Date(currentDate.getTime() + _1DAY);
        ObservedCity observedCity = new ObservedCity(1L, "City1", startDateTime, endDateTime);
        user.addObservedCity(observedCity);

        String expected = om.writeValueAsString(user);

        KeyAndObservedCityDTO keyAndObservedCityDTO = new KeyAndObservedCityDTO(user.getEmail(), observedCity);
        ResponseEntity<String> response = restTemplate.postForEntity("/users/add-observedcity", keyAndObservedCityDTO, String.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        JSONAssert.assertEquals(expected, response.getBody(), false);

        verify(mockRepository, times(1)).save(any(User.class));

    }

}
