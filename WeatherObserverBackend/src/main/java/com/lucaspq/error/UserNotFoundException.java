package com.lucaspq.error;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String email) {
        super("User email not found : " + email);
    }

}
