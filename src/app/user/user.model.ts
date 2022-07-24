export class User {
    public readonly id: number;
    public username: string;
    public password: string;
    public name: string;
    public email: string;
    public contactNo: string;
    public isAdmin: boolean;
  
    constructor(data: any = {}) {
      this.id = data.id;
      this.username = data.username ? data.username : '';
      this.password = data.password ? data.password : '';
      this.name = data.name ? data.name : '';
      this.email = data.email ? data.email : '';
      this.contactNo = data.contactNo ? data.contactNo : '';
      this.isAdmin = data.isAdmin ? data.isAdmin : false;
  }
}