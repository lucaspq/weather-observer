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

    public Boolean active() {
        Date currentDateTime = new Date();
        return currentDateTime.after(startDateTime) && currentDateTime.before(endDateTime);
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
    public void setIcon(String icon) {
        this.icon = icon;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((endDateTime == null) ? 0 : endDateTime.hashCode());
        result = prime * result + ((icon == null) ? 0 : icon.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((obsDateTime == null) ? 0 : obsDateTime.hashCode());
        result = prime * result + ((startDateTime == null) ? 0 : startDateTime.hashCode());
        result = prime * result + ((temperature == null) ? 0 : temperature.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ObservedCity other = (ObservedCity) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

}
