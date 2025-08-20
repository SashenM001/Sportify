package com.sportify.sportsmanagementsystem.exception;

public class MediaPostNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    public MediaPostNotFoundException(String message) {
        super(message);
    }
}
