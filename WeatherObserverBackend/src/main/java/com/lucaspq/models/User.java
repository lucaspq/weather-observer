package com.lucaspq.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String email;

    @OneToMany(targetEntity=ObservedCity.class, cascade = {CascadeType.ALL})
    private List<ObservedCity> listObservedCity;

    
    public User() { }

    public User(String email) {
        this.email = email;
        listObservedCity = new ArrayList<ObservedCity>();
    }

    public User(Long id, String email) {
        this.id = id;
        this.email = email;
        listObservedCity = new ArrayList<ObservedCity>();
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<ObservedCity> getListObservedCity() {
        return listObservedCity;
    }
    public void setListbservedCity(List<ObservedCity> listObservedCity) {
        this.listObservedCity = listObservedCity;
    }

    public void addObservedCity(ObservedCity observedCity) {
        this.listObservedCity.add(observedCity);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((listObservedCity == null) ? 0 : listObservedCity.hashCode());
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
        User other = (User) obj;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
    
}
