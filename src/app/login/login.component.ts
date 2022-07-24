import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user/user.services';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser } from './login.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";

  loggedInUser: User = new User();

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let user: LoginUser = new LoginUser(this.username, this.password);
    console.log(user);
    this.userService.login(user).subscribe((data: User) => {
      console.log(data);
      this.loggedInUser = data;
      sessionStorage.setItem('thisUser', data.id.toString());
      sessionStorage.setItem('userType', data.isAdmin.toString());
      console.log(sessionStorage.getItem('thisUser'));
      console.log(sessionStorage.getItem('userType'));

      if (data.isAdmin) {
        // sessionStorage.setItem('checkAdmin', "Admin");
        // console.log(sessionStorage.getItem('checkAdmin'));
        this.router.navigate(['/admin/books'])
      } else if (!data.isAdmin) {
        // sessionStorage.setItem('checkAdmin', "User");
        // console.log(sessionStorage.getItem('checkAdmin'));
        this.router.navigate(['/books'])
      } else {
        console.log('Unknown usertype detected (user id = ' + data.id + ')')
        alert('Please contact a system administrator')
      }
    });
  }
}
