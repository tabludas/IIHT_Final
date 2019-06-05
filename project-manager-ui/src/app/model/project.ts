import { User } from "./user";
import { PmTask } from "./pm-task";

export class Project {
    projectId: string;
    projectName: string;
    priority: number;
    startDate: string;
    endDate: string;
    projectCompleted: string="N";
    user: User;
    pmTasks: PmTask[];
    noOfTask:number;
    
}
