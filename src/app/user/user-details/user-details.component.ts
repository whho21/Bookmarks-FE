import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User = new User;

  constructor(public uService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.uService.getUserById(this.route.snapshot.params['uid'])
    .subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }
  logout(){
    sessionStorage.clear;
  }
  backPage() {
    this.router.navigate(['admin/users']);
  }

}