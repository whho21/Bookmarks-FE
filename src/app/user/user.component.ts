import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any = [];

  constructor(public userservice: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
      this.getUsers();
      console.log(this.getUsers);
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
  }
  getUsers() {
    this.users = [];
    this.userservice.getUsers().subscribe((data: {}) => {
      console.log(data);
      this.users = data;
    });
  }

  async add() {
    await this.router.navigate(['/product-add']);
  }
  async view(id: any) {
    await this.router.navigate(['/user/:uid']);
  }

  delete(id: any, name: any) {
    if (confirm("Are you sure you want to delete User: " + name)) {
      this.userservice.deleteUser(id)
        .subscribe({
          next: res => {
            this.getUsers();
          }, error: (err) => {
            console.log(err);
          }
        });
    } else {
      alert("Deletion of User: " + name + " cancelled");
    }
  }
  logout() {
    sessionStorage.clear();
  }

}
