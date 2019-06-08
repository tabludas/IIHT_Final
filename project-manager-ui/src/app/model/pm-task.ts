import { PmParentTask } from "./pm-parent-task";
import { Project } from "./project";
import { User } from "./user";

export class PmTask {
    taskId: string;
    taskName: string;
    priority: number=0;
    parentTask: PmParentTask=new PmParentTask();
    startDate: string;
    endDate: string;
    project:Project;
    user:User;
    taskCompleted: string="N";
}
