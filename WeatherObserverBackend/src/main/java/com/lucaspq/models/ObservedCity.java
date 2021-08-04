package com.lucaspq.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ObservedCity {

    @Id
    @GeneratedValue
    private Long id;

    private String city;
    private Date startDateTime;
    private Date endDateTime;
    private BigDecimal temperature;
    private String description;
    private Date obsDateTime;
    private String icon;
    
    public ObservedCity() { }
    
    public ObservedCity(String city, Date startDateTime, Date endDateTime) {
        this.city = city;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }
    
    public ObservedCity(Long id, String city, Date startDateTime, Date endDateTime) {
        this.id = id;
        this.city = city;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public Date getStartDateTime() {
        return startDateTime;
    }
    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }
    public Date getEndDateTime() {
        return endDateTime;
    }
    public void setEndDateTime(Date endDateTime) {
        this.endDateTime = endDateTime;
    }
    public BigDecimal getTemperature() {
        return temperature;
    }
    public void setTemperature(BigDecimal temperature) {
        this.temperature = temperature;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getObsDateTime() {
        return obsDateTime;
    }
    public void setObsDateTime(Date obsDateTime) {
        this.obsDateTime = obsDateTime;
    }
    public String getIcon() {
        return icon;
    }
    public void setIconId(String icon) {
        this.icon = icon;
    }

    public Boolean active() {
        Date currentDateTime = new Date();
        return currentDateTime.after(startDateTime) && currentDateTime.before(endDateTime);
    }

}
