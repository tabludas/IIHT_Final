package com.cts.projectmanagerservice.model;

import java.io.Serializable;

public class Result<T> extends BaseModel {
    private static final long serialVersionUID = 1L;

    private T data;
    boolean success;
    private ErrorResponse error;


    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public ErrorResponse getError() {
        return error;
    }

    public void setError(ErrorResponse error) {
        this.error = error;
    }
}
