package com.cts.projectmanagerservice.controller;

import com.cts.projectmanagerservice.model.*;
import com.cts.projectmanagerservice.service.ProjectManagerService;
import com.cts.projectmanagerservice.service.ProjectManagerServiceImpl;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)

public class ProjectManagerControllerTest {

    @InjectMocks
    ProjectManagerController projectManagerController;

    @Mock
    ProjectManagerService projectManagerService;

    @Captor
    private ArgumentCaptor<PMTask> pmTaskArgument;

    @Captor
    private ArgumentCaptor<Project> projectArgument;

    @Captor
    private ArgumentCaptor<User> userArgument;

    @Test()
    public void ping() {
        projectManagerController.ping();
    }

    @Test
    public void createOrUpdateTask() throws Exception {
        PMTask pmTask = getPmTask();

        assertThat(projectManagerController.createOrUpdateTask(pmTask), Matchers.any(ResponseEntity.class));

        verify(projectManagerService).createOrUpdateTask(pmTaskArgument.capture());
        verify(projectManagerService, times(1)).createOrUpdateTask(any(PMTask.class));
    }


    @Test
    public void createOrUpdateProject() throws Exception {
        Project project = getProject();

        assertThat(projectManagerController.createOrUpdatProject(project), Matchers.any(ResponseEntity.class));
        verify(projectManagerService).createOrUpdateProject(projectArgument.capture());
        verify(projectManagerService, times(1)).createOrUpdateProject(any(Project.class));
    }


    @Test
    public void createOrUpdateUser() throws Exception {
        User user = getUser();

        assertThat(projectManagerController.createOrUpdateUser(user), Matchers.any(ResponseEntity.class));
        verify(projectManagerService).createOrUpdateUser(userArgument.capture());
        verify(projectManagerService, times(1)).createOrUpdateUser(any(User.class));
    }

    @Test
    public void deleteUser() throws Exception {
        User user = getUser();

        assertThat(projectManagerController.deleteUser(user), Matchers.any(ResponseEntity.class));
        verify(projectManagerService).deleteUser(userArgument.capture());
        verify(projectManagerService, times(1)).deleteUser(any(User.class));

    }


    @Test
    public void getTasks() throws Exception {
        List<PMTask> expectedPmTasks = new ArrayList<PMTask>();
        PMTask pmTask = getPmTask();
        expectedPmTasks.add(pmTask);

        when(projectManagerService.getTasks()).thenReturn(expectedPmTasks);
        ResponseEntity<Result> res = projectManagerController.getTasks();
        assertSame(expectedPmTasks, res.getBody().getData());
    }

    @Test
    public void getUsers() throws Exception {
        List<User> expectedUsers = new ArrayList<User>();
        User user = getUser();
        expectedUsers.add(user);

        when(projectManagerService.getUsers()).thenReturn(expectedUsers);
        ResponseEntity<Result> res = projectManagerController.getUsers();
        assertEquals(expectedUsers, res.getBody().getData());
    }

    @Test
    public void getProjects() throws Exception {
        List<Project> expectedProjects = new ArrayList<Project>();
        Project project = getProject();
        expectedProjects.add(project);

        when(projectManagerService.getProjects()).thenReturn(expectedProjects);
        ResponseEntity<Result> res = projectManagerController.getProjects();
        assertSame(expectedProjects, res.getBody().getData());
    }

    @Test
    public void getParentTasks() throws Exception {
        List<PMParentTask> expectedParentTasks = new ArrayList<PMParentTask>();
        PMParentTask parentTask = getPmParentTask();
        expectedParentTasks.add(parentTask);

        when(projectManagerService.getParentTasks()).thenReturn(expectedParentTasks);
        ResponseEntity<Result> res = projectManagerController.getParentTasks();
        assertSame(expectedParentTasks, res.getBody().getData());
    }

    private User getUser() {
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Ram");
        user.setLastName("Das");
        user.setActive("Y");
        return user;
    }

    private Project getProject() {
        Project project = new Project();
        project.setProjectId(1);
        project.setProjectName("Project 1");
        return project;
    }

    private PMTask getPmTask() {
        PMTask pmTask = new PMTask();
        pmTask.setTaskId(1);
        pmTask.setTaskName("Task 1");
        return pmTask;
    }

    private PMParentTask getPmParentTask() {
        PMParentTask pmParentTask = new PMParentTask();
        pmParentTask.setParentTaskId(1);
        pmParentTask.setParentTaskName("Parent Task 1");
        return pmParentTask;
    }

}