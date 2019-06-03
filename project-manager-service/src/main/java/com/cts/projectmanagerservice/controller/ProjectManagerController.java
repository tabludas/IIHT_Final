package com.cts.projectmanagerservice.controller;

import com.cts.projectmanagerservice.exception.ProjectManagerException;
import com.cts.projectmanagerservice.model.*;
import com.cts.projectmanagerservice.service.ProjectManagerService;
import org.apache.tomcat.jni.Error;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/projectmanager")
public class ProjectManagerController {
    private static final Logger logger = LoggerFactory.getLogger(ProjectManagerController.class);

    @Autowired
    ProjectManagerService projectManagerService;

    //http://localhost:8086/api/projectmanager/ping
    @GetMapping(path = "ping")
    public String ping() {
        return "ProjectManeger Service Working";
    }


    //http://localhost:8086/api/projectmanager/saveTask
    @PostMapping(path = "saveTask")
    public ResponseEntity<Result> createOrUpdateTask(@RequestBody PMTask pmTask) {
        logger.info("Enter into ProjectManagerController: createOrUpdateTask()-> " + pmTask);

        Result<String> result = new Result<String>();
        try {
            projectManagerService.createOrUpdateTask(pmTask);
            result.setData("Success");
            result.setSuccess(true);
        } catch (Exception ex) {
            result.setData("Failure");
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //http://localhost:8086/api/projectmanager/saveUser
    @PostMapping(path = "saveUser")
    public ResponseEntity<Result> createOrUpdateUser(@RequestBody User user) {
        logger.info("Enter into ProjectManagerController: createOrUpdateUser()-> " + user);

        Result<String> result = new Result<String>();
        try {
            projectManagerService.createOrUpdateUser(user);
            result.setData("Success");
            result.setSuccess(true);
        } catch (Exception ex) {
            result.setData("Failure");
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //http://localhost:8086/api/projectmanager/saveProject
    @PostMapping(path = "saveProject")
    public ResponseEntity<Result> createOrUpdatProject(@RequestBody Project project) {
        logger.info("Enter into ProjectManagerController: createOrUpdatProject()-> " + project);

        Result<String> result = new Result<String>();
        try {
            projectManagerService.createOrUpdateProject(project);
            result.setData("Success");
            result.setSuccess(true);
        } catch (Exception ex) {
            result.setData("Failure");
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //http://localhost:8086/api/projectmanager/deleteUser
    @PostMapping(path = "deleteUser")
    public ResponseEntity<Result> deleteUser(@RequestBody User user) {
        logger.info("Enter into ProjectManagerController: deleteUser()-> " + user);

        Result<String> result = new Result<String>();
        try {
            projectManagerService.deleteUser(user);
            result.setData("Success");
            result.setSuccess(true);
        } catch (Exception ex) {
            result.setData("Failure");
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    //http://localhost:8086/api/projectmanager/getTasks
    @GetMapping(path = "getTasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Result> getTasks() {
        logger.info("Enter into ProjectManagerController: saveTask()");

        Result<List<PMTask>> result = new Result<List<PMTask>>();
        try {
            List<PMTask> pmTasks = projectManagerService.getTasks();
            result.setData(pmTasks);
            result.setSuccess(true);
        } catch (Exception ex) {
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //http://localhost:8086/api/projectmanager/getUsers
    @GetMapping(path = "getUsers")
    public ResponseEntity<Result> getUsers() {
        logger.info("Enter into ProjectManagerController: getUsers()");

        Result<List<User>> result = new Result<List<User>>();
        try {
            List<User> users = projectManagerService.getUsers();
            result.setData(users);
            result.setSuccess(true);
        } catch (Exception ex) {
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    //http://localhost:8086/api/projectmanager/getProjects
    @GetMapping(path = "getProjects")
    public ResponseEntity<Result> getProjects() {
        logger.info("Enter into ProjectManagerController: getUsers()");

        Result<List<Project>> result = new Result<List<Project>>();
        try {
            List<Project> projects = projectManagerService.getProjects();
            result.setData(projects);
            result.setSuccess(true);
        } catch (Exception ex) {
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    //http://localhost:8086/api/projectmanager/getParentTasks
    @GetMapping(path = "getParentTasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Result> getParentTasks() {
        logger.info("Enter into ProjectManagerController: saveTask()");

        Result<List<PMParentTask>> result = new Result<List<PMParentTask>>();
        try {
            List<PMParentTask> pmParentTasks = projectManagerService.getParentTasks();
            result.setData(pmParentTasks);
            result.setSuccess(true);
        } catch (Exception ex) {
            ProjectManagerException pe = populateProjectManagerException(result, ex);
            throw pe;
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    private <T> ProjectManagerException populateProjectManagerException(final Result<T> result, final Exception ex) {
        ProjectManagerException pe = new ProjectManagerException(ex);
        ErrorResponse er = pe.getError();
        result.setError(er);
        logger.error("*******ERROR********** " + er);
        return pe;
    }


}
