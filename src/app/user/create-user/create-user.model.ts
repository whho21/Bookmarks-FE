export class NewUser {
    public name: string;
    public username: string;
    public email: string;
    public contactNo: string;
    public password:string;
  
    constructor(name:string, username:string, email:string, contactNo:string, password:string) {
      this.name = name ? name : '';
      this.username = username ? username : '';
      this.email = email ? email : '';
      this.contactNo = contactNo ? contactNo : '';
      this.password = password ? password : '';
    }
  }