package com.cts.projectmanagerservice.repository;


import com.cts.projectmanagerservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectManagerUserRepository extends JpaRepository<User,Long> {

}
