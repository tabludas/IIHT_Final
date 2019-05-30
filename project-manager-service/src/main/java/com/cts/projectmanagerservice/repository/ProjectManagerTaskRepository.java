package com.cts.projectmanagerservice.repository;

import com.cts.projectmanagerservice.model.PMTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ProjectManagerTaskRepository extends JpaRepository<PMTask,Long>{

}
