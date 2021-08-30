import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user.model";
import {CreateUser} from "../../models/create-user.model";
import {UserService} from "../../services/user.service";

import format from 'date-fns/format';

@Component({
  selector: 'app-register-regular-user',
  templateUrl: './register-regular-user.component.html',
  styleUrls: ['./register-regular-user.component.css']
})
export class RegisterRegularUserComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.minLength(4)]),
    birthday: new FormControl("", [Validators.required, Validators.minLength(4)]),
    website: new FormControl(""),
    biography: new FormControl(""),
  });
  gender = "male";


  constructor(
    private router: Router,
    private userService: UserService,
    private tService: ToastrService) {
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    // console.log('Username: ' + this.loginForm.value.username);
    // console.log('Password: ' + this.loginForm.value.password);

    if (this.registerForm?.valid) {

      const createUser = new CreateUser(
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.email,
        this.registerForm.value.name,
        this.registerForm.value.phoneNumber,
        this.gender,
        format(this.registerForm.value.birthday, "dd.MM.yyyy."),
        this.registerForm.value.website,
        this.registerForm.value.biography
      );

      console.log(createUser);

      this.userService
        .register(createUser)
        .subscribe(
          (response: User) => {
            this.tService.success('', 'User is registered successfully');
          },
          err => {
            console.log(err);
            this.tService.warning(err.error.msg, 'Could not create user');
          }
        );
    }
  }
}
