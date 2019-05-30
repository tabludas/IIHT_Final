package com.cts.projectmanagerservice.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="PM_Parent_Task" )
public class PMParentTask extends BaseModel {
    private static final long serialVersionUID = 1L;

    @Column(name = "Parent_Task_ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer parentTaskId;

    @Column(name = "Parent_Task_Name")
    private String parentTaskName;

    public Integer getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(Integer parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public String getParentTaskName() {
        return parentTaskName;
    }

    public void setParentTaskName(String parentTaskName) {
        this.parentTaskName = parentTaskName;
    }
}
