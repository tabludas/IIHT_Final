package com.cts.projectmanagerservice;

import com.cts.projectmanagerservice.exception.ProjectManagerException;
import com.cts.projectmanagerservice.model.ErrorResponse;
import com.cts.projectmanagerservice.model.PMTask;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectManagerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectManagerServiceApplication.class, args);

	}

}
