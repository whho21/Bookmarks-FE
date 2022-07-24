export class LoginUser {
    public username: string;
    public password: string;
  
    constructor(username:any,password:any) {
      this.username = username ? username : '';
      this.password = password ? password : '';
  }
}