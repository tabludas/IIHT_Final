export class User {
    userId: string;
    firstName: string;
    lastName: string;
    empId: string;
    _fullName:string;
    active:string="N";
    
    set fullName(value:string){
        this._fullName=value;
    }  

    get fullName():string{
        return this._fullName;
    }
   }
