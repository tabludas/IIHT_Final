package com.cts.projectmanagerservice.exception;

import com.cts.projectmanagerservice.model.ErrorResponse;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ProjectManagerException extends RuntimeException {
    private ErrorResponse error;

    {
        error=new ErrorResponse();
    }
    public ProjectManagerException() {
        //super();
        error.setMessage(getMessage());
        error.setStackTrace(getStackTraceMessage());
    }

    public ProjectManagerException(String message) {
        super(message);
        error.setMessage(getMessage());
        error.setStackTrace(getStackTraceMessage());
    }

    public ProjectManagerException(String message, Throwable cause) {
        super(message, cause);
        error.setMessage(getMessage());
        error.setStackTrace(getStackTraceMessage());
    }

    public ProjectManagerException(Throwable cause) {
        super(cause);
        error.setMessage(getMessage());
        error.setStackTrace(getStackTraceMessage());
    }

    public ErrorResponse getError() {
        return error;
    }

    public void setError(ErrorResponse error) {
        this.error = error;
    }

    String getStackTraceMessage(){

        StringWriter sw=new StringWriter();
        PrintWriter pw=new PrintWriter(sw);
        printStackTrace(pw);
        return sw.toString();
    }



}
