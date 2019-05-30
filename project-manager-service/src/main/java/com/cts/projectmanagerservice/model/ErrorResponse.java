package com.cts.projectmanagerservice.model;

import java.io.Serializable;

public class ErrorResponse extends BaseModel {
    private static final long serialVersionUID = 1L;

    private String message;
    private String code;
    private String stackTrace;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }
}
