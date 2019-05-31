import { PmParentTask } from "./pm-parent-task";
import { Project } from "./project";

export class PmTask {
    taskId: string;
    taskName: string;
    priority: string;
    parentTask: PmParentTask;
    startDate: string;
    endDate: string;
    project:Project;
    taskCompleted: string;
}
