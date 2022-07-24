import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.services';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  form!: FormGroup;

  @Input() userData: any = {
    name: '',
    username: '',
    password: '',
    email: '',
    contactNo: '',
    isAdmin: '',
  };

  constructor(private fb: FormBuilder, public userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {
     // console.log("Testing User Id from route");
    // console.log(this.route.snapshot.params['uid']);
    this.userService.getUserById(this.route.snapshot.params['uid']).subscribe((data: {}) => {

      //  this.bookservice.getBookById(1).subscribe((data: {}) => {
      console.log("Retrieved From Backend");
      console.log(data);

      this.userData = data;
      //this.book = <Book>data;
      // console.log("Can Userdata be assigned?");
      // console.log(this.userData);
    })
    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
    
  }

  initializeform() {
      this.form = this.fb.group({
        name: '',
        username: '',
        password: '',
        email: '',
        contactNo: '',
        isAdmin: ''
      })
    }

  updateUser() {
      console.log("The userData is it updated?");
      //console.log(this.form.value);
      console.log(this.userData);
      this
      .userService
          .updateUser(this.route.snapshot.params['uid'], this.userData)
          .subscribe({
            next: async (result) => {
              console.log("Edited");
              await this.router.navigate(['admin/users/details/' + result.id]);
            },
            error: (err) => {
              console.log(err);
            }
          })
    }
    logout(){
      sessionStorage.clear;
    }
}
