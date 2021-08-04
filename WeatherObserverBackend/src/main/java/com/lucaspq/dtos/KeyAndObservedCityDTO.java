package com.lucaspq.dtos;

import com.lucaspq.models.ObservedCity;

public class KeyAndObservedCityDTO {

    private String userKey;
    private ObservedCity observedCity;


    public KeyAndObservedCityDTO(String userKey, ObservedCity observedCity) {
        this.userKey = userKey;
        this.observedCity = observedCity;
    }
    public String getUserKey() {
        return userKey;
    }
    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }
    public ObservedCity getObservedCity() {
        return observedCity;
    }
    public void setObservedCity(ObservedCity observedCity) {
        this.observedCity = observedCity;
    }
    
}
