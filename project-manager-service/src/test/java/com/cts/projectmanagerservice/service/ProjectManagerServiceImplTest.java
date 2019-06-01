package com.cts.projectmanagerservice.service;

import com.cts.projectmanagerservice.model.PMParentTask;
import com.cts.projectmanagerservice.model.PMTask;
import com.cts.projectmanagerservice.model.Project;
import com.cts.projectmanagerservice.model.User;
import com.cts.projectmanagerservice.repository.ProjectManagerParentTaskRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerProjectRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerTaskRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerUserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ProjectManagerServiceImplTest {

    @InjectMocks
    ProjectManagerServiceImpl projectManagerService;

    @Mock
    ProjectManagerUserRepository projectManagerUserRepository;

    @Mock
    ProjectManagerTaskRepository projectManagerTaskRepository;

    @Mock
    ProjectManagerProjectRepository projectManagerProjectRepository;

    @Mock
    ProjectManagerParentTaskRepository projectManagerParentTaskRepository;

    @Captor
    private ArgumentCaptor<PMTask> pmTaskArgument;

    @Captor
    private ArgumentCaptor<Project> projectArgument;

    @Captor
    private ArgumentCaptor<User> userArgument;

    @Captor
    private ArgumentCaptor<PMParentTask> parentTaskArgument;

    @Test
    public void createOrUpdateTask() throws Exception {
        PMTask pmTask = getPmTask();
        projectManagerService.createOrUpdateTask(pmTask);
        verify(projectManagerTaskRepository, times(1)).save(pmTaskArgument.capture());
    }

    @Test
    public void createOrUpdateUser() throws Exception {
        User user = getUser();
        projectManagerService.createOrUpdateUser(user);
        verify(projectManagerUserRepository, times(1)).save(userArgument.capture());
    }

    @Test
    public void createOrUpdateProject() throws Exception {
        Project project = getProject();
        projectManagerService.createOrUpdateProject(project);
        verify(projectManagerProjectRepository, times(1)).save(projectArgument.capture());
    }

    @Test
    public void getTasks() throws Exception {
        List<PMTask> expectedPmTasks = new ArrayList<PMTask>();
        PMTask pmTask = getPmTask();
        expectedPmTasks.add(pmTask);

        when(projectManagerTaskRepository.findAll()).thenReturn(expectedPmTasks);
        List<PMTask> actualPmTasks = projectManagerService.getTasks();
        assertSame(expectedPmTasks, actualPmTasks);
    }

    @Test
    public void getUsers() throws Exception {
        List<User> expectedUsers = new ArrayList<User>();
        User user = getUser();
        expectedUsers.add(user);

        when(projectManagerUserRepository.findAll()).thenReturn(expectedUsers);
        List<User> actualUsers = projectManagerService.getUsers();
        assertSame(expectedUsers, actualUsers);
    }

    @Test
    public void getProjects() throws Exception {
        List<Project> expectedProjects = new ArrayList<Project>();
        Project project = getProject();
        expectedProjects.add(project);

        when(projectManagerProjectRepository.findAll()).thenReturn(expectedProjects);
        List<Project> actualProjects = projectManagerService.getProjects();
        assertSame(expectedProjects, actualProjects);
    }

    @Test
    public void getParentTasks() throws Exception {
        List<PMParentTask> expectedParentTasks = new ArrayList<PMParentTask>();
        PMParentTask parentTask = getPmParentTask();
        expectedParentTasks.add(parentTask);

        when(projectManagerParentTaskRepository.findAll()).thenReturn(expectedParentTasks);
        List<PMParentTask> actualParentTasks = projectManagerService.getParentTasks();
        assertSame(expectedParentTasks, actualParentTasks);
    }

   /* @Test
    public void deleteTask() throws Exception {
    }*/

    private User getUser() {
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Ram");
        user.setLastName("Das");
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