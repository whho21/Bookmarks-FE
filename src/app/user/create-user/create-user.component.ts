import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from './create-user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public userservice: UserService, private route: ActivatedRoute, private router: Router) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern("^[0-9]{8}$"), Validators.minLength(8)]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    let checkAdmin: string | null = sessionStorage.getItem('userType');
    if (checkAdmin == 'true') {

    } else if (checkAdmin == 'false') {
      this.router.navigate(['/books'])
    } else {
      this.router.navigate(['/login'])
      console.log('Not logged in');
      alert('Not logged in');
    }
  }

  get f() {
    return this.form.controls;
  }

  create() {
    if(this.form.invalid){
      alert("Please fill in the required fields!")
      return;
    } 
    console.log("Form Values");
    console.log(this.form.value);
    this.userservice
      .addUser(this.form.value)
      .subscribe({
        next: async (result) => {
          await this.router.navigate(['admin/users/details/' + result.id]);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  logout() {
    sessionStorage.clear;
  }

}

function ConfirmedValidator(arg0: string, arg1: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls['password'];
    const matchingControl = formGroup.controls['confirm_password'];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
  //  throw new Error('Function not implemented.');
}