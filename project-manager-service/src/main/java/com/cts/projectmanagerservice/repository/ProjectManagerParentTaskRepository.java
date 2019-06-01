package com.cts.projectmanagerservice.repository;


import com.cts.projectmanagerservice.model.PMParentTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectManagerParentTaskRepository extends JpaRepository<PMParentTask,Long> {
}
