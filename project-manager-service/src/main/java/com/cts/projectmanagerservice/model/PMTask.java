package com.cts.projectmanagerservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name ="PM_Task" )
public class PMTask extends BaseModel {
    private static final long serialVersionUID = 1L;

    @Column(name = "Task_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;

    @ManyToOne(fetch = FetchType.LAZY)//use @OneToOne to create table
    @JoinColumn(name = "Parent_Task_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private PMParentTask pmParentTask;

    @Column(name = "Task_Name")
    private String taskName;

    @Column(name = "Priority")
    private int priority;

    @Column(name = "Task_Completed")
    private String taskCompleted;

    @Column(name = "Start_Date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "End_Date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "User_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Project_ID")//after creating table structure uncommente it else creates table project_pm_tasks
    private Project project;


    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public PMParentTask getPmParentTask() {
        return pmParentTask;
    }

    public void setPmParentTask(PMParentTask pmParentTask) {
        this.pmParentTask = pmParentTask;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getTaskCompleted() {
        return taskCompleted;
    }

    public void setTaskCompleted(String taskCompleted) {
        this.taskCompleted = taskCompleted;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

   public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

}
