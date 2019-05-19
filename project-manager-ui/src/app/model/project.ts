import { User } from "./user";
import { PmTask } from "./pm-task";

export class Project {
    projectId: string;
    projectName: string;
    priority: number;
    startDate: string;
    endDate: string;
    projectedCompleted: string;
    user: User;
    pmTasks: PmTask[];
    checkBoxValue:boolean;
}
