package com.cts.projectmanagerservice.service;

import com.cts.projectmanagerservice.exception.ProjectManagerException;
import com.cts.projectmanagerservice.model.PMParentTask;
import com.cts.projectmanagerservice.model.PMTask;
import com.cts.projectmanagerservice.model.Project;
import com.cts.projectmanagerservice.model.User;
import com.cts.projectmanagerservice.repository.ProjectManagerParentTaskRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerProjectRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerTaskRepository;
import com.cts.projectmanagerservice.repository.ProjectManagerUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectManagerServiceImpl implements ProjectManagerService {
    private static final Logger logger = LoggerFactory.getLogger(ProjectManagerServiceImpl.class);

    @Autowired
    ProjectManagerTaskRepository projectManagerTaskRepository;

    @Autowired
    ProjectManagerUserRepository projectManagerUserRepository;

    @Autowired
    ProjectManagerProjectRepository projectManagerProjectRepository;

    @Autowired
    ProjectManagerParentTaskRepository projectManagerParentTaskRepository;

    @Override
    public void createOrUpdateTask(final PMTask pmTask) {
        logger.info("Enter into ProjectManagerServiceImpl: createTask()--> " + pmTask);
        projectManagerTaskRepository.save(pmTask);
    }

    @Override
    public void createOrUpdateUser(User user) throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: createUser()--> " + user);
        projectManagerUserRepository.save(user);
    }

    @Override
    public void createOrUpdateProject(Project project) throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: createProject()--> " + project);
        projectManagerProjectRepository.save(project);
    }


    @Override
    public List<PMTask> getTasks() throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: getTasks()");
        return projectManagerTaskRepository.findAll();
    }

    @Override
    public List<User> getUsers() throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: getUsers()");
        List<User> users=projectManagerUserRepository.findAll();
        users=users.stream().filter(user->user.getActive().equals("Y")).collect(Collectors.toList());
        return users;
    }

    @Override
    public List<Project> getProjects() throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: getProjects()");
        return projectManagerProjectRepository.findAll();
    }

    @Override
    public List<PMParentTask> getParentTasks() throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: getParentTasks()");
        return projectManagerParentTaskRepository.findAll();
    }

    @Override
    public void deleteUser(final User user) throws ProjectManagerException {
        logger.info("Enter into ProjectManagerServiceImpl: deleteTask()--> " + user);
        projectManagerUserRepository.delete(user);
    }


}
