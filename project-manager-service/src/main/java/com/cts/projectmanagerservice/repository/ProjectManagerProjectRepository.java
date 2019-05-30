package com.cts.projectmanagerservice.repository;

import com.cts.projectmanagerservice.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectManagerProjectRepository  extends JpaRepository<Project,Long> {
}
