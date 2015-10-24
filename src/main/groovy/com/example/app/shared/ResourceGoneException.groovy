package com.example.app.shared

/**
 * Created by naga on 15/03/29.
 */
class ResourceGoneException extends RuntimeException {

    public ResourceGoneException() {
        super();
    }

    public ResourceGoneException(String message) {
        super(message)
    }
}
