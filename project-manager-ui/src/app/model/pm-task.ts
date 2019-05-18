import { PmParentTask } from "./pm-parent-task";

export class PmTask {
    taskId: string;
    taskName: string;
    priority: string;
    parentTask: PmParentTask;
    startDate: string;
    endDate: string;
    taskCompleted: string;
}
