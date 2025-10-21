package com.vhsrental.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageSource messageSource;

    // Handle validation errors (from @Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleValidationErrors(
            MethodArgumentNotValidException ex,
            HttpServletRequest request,
            Locale locale
    ) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            String localizedMessage = messageSource.getMessage(error, locale);
            errors.put(error.getField(), localizedMessage);
        }

        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(),
                "VALIDATION_ERROR",
                errors.toString(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Handle custom business exceptions
    @ExceptionHandler(VhsNotFoundException.class)
    public ResponseEntity<Object> handleVhsNotFound(
            VhsNotFoundException ex,
            HttpServletRequest request,
            Locale locale
    ) {
        String key = ex.getMessage().split(":")[0]; // "vhs.notfound"
        String arg = ex.getMessage().split(":")[1]; // the VHS id
        String message = messageSource.getMessage(key, new Object[]{arg}, locale);

        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(),
                "VHS_NOT_FOUND",
                message,
                request.getRequestURI()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Catch-all for unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(
            Exception ex,
            HttpServletRequest request
    ) {
        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(),
                "INTERNAL_ERROR",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
