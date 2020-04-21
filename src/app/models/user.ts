export class User {
public constructor(
    public uId?: number,
    public id?: string,
    public fName?: string,
    public lName?: string,
    public uName?: string,
    public bDate: Date = null,
    public userGender?: string,
    public userEmail? : string,
    public userPassword? : string,
    public userRole?: string,
    public userPhoto : string = null){}
}
