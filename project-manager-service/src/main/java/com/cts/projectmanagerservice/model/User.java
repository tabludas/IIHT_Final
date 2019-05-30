package com.cts.projectmanagerservice.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="User" )
public class User extends BaseModel {
    private static final long serialVersionUID = 1L;

    @Column(name = "User_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "First_Name", nullable = false)
    private String firstName;

    @Column(name = "Last_Name")
    private String lastName;

    @Column(name = "Emp_ID", nullable = false)
    private String empId;

    /*@OneToOne
    private PMTask pmTask;

    @OneToOne
    private Project project;*/

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    /*public PMTask getPmTask() {
        return pmTask;
    }

    public void setPmTask(PMTask pmTask) {
        this.pmTask = pmTask;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }*/
}
