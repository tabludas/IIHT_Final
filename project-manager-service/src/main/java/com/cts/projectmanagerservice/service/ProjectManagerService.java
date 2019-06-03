package com.cts.projectmanagerservice.service;

import com.cts.projectmanagerservice.exception.ProjectManagerException;
import com.cts.projectmanagerservice.model.PMParentTask;
import com.cts.projectmanagerservice.model.PMTask;
import com.cts.projectmanagerservice.model.Project;
import com.cts.projectmanagerservice.model.User;

import java.util.List;

public interface ProjectManagerService {
    void createOrUpdateTask(final PMTask pmTask) throws ProjectManagerException;

    void createOrUpdateUser(final User user) throws ProjectManagerException;

    void createOrUpdateProject(Project project) throws ProjectManagerException;

    List<PMTask> getTasks() throws ProjectManagerException;

    List<User> getUsers() throws ProjectManagerException;

    List<Project> getProjects() throws ProjectManagerException;

    List<PMParentTask> getParentTasks() throws ProjectManagerException;

    void deleteUser(User user) throws ProjectManagerException;;
}
