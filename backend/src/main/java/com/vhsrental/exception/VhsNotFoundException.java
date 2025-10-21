package com.vhsrental.exception;

public class VhsNotFoundException extends RuntimeException {
    public VhsNotFoundException(Long id) {
        super("vhs.notfound:" + id); // key for MessageSource
    }
}
