import { User } from "./user";
import { PmTask } from "./pm-task";

export class Project {
    projectId: string;
    projectName: string;
    priority: number;
    startDate: string;
    endDate: string;
    projectCompleted: string;
    user: User;
    pmTasks: PmTask[];
    
    get no_Of_Task():number{
        if(this.pmTasks){
            return this.pmTasks.length;
        }        
    }
}
