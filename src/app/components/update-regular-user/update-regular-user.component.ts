import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../models/user.model";
import {UpdateUser} from "../../models/update-user.model";
import {PasswordReset} from "../../models/pasword-reset.model";

import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-update-regular-user',
  templateUrl: './update-regular-user.component.html',
  styleUrls: ['./update-regular-user.component.css']
})
export class UpdateRegularUserComponent implements OnInit {

  // @ts-ignore
  user: User;
  gender: string = "male";
  updateForm: FormGroup = new FormGroup({});
  resetPasswordForm: FormGroup = new FormGroup({});

  isPrivate: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tService: ToastrService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      return;
    }

    this.updateForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(4)]),
      birthday: new FormControl(parse(this.user.birthday, 'dd.MM.yyyy.', new Date()), [Validators.required]),
      website: new FormControl(this.user.website),
      biography: new FormControl(this.user.biography)
    });
    this.gender = this.user.gender;

    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl("", [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(5)]),
    });

    this.isPrivate = this.user.isPrivate;
  }

  onUpdate(): void {
    if (this.updateForm?.valid) {
      const updateUser = new UpdateUser(
        this.updateForm.value.username,
        this.updateForm.value.email,
        this.updateForm.value.name,
        this.updateForm.value.phoneNumber,
        this.gender,
        format(this.updateForm.value.birthday, "dd.MM.yyyy."),
        this.updateForm.value.website,
        this.updateForm.value.biography
      );

      console.log(updateUser);

     this.userService
        .update(updateUser, this.user.id)
        .subscribe(
          (response: User) => {
            this.tService.success('', 'User is updated successfully');
            this.authService.getAndSaveAuthenticatedUser();
          },
          err => {
            console.log(err);
            this.tService.warning(err.error.msg, 'Could not update user');
          }
        );
    }
  }

  onChangePassword(): void {
    if (this.resetPasswordForm?.valid) {
      const passReset = new PasswordReset(
        this.resetPasswordForm.value.oldPassword,
        this.resetPasswordForm.value.newPassword,
      );

      console.log(passReset);

      this.userService
        .resetPassword(passReset)
        .subscribe(
          () => {
            this.tService.success('', 'User password is updated successfully');
            this.authService.logout();
            this.router.navigateByUrl('login');
          },
          err => {
            console.log(err);
            this.tService.warning(err.error.msg, 'Could not update user password');
          }
        );
    }
  }

  toggleIsPrivate(event: MatSlideToggleChange): void {
    this.userService
      .changeIsPrivate(event.checked)
      .subscribe(
        () => {
          this.tService.success('', 'User privacy is updated successfully');
          this.isPrivate = event.checked;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not update user privacy');
        }
      );
  }

  deactivate(): void {
    this.userService
      .delete()
      .subscribe(
        () => {
          this.tService.success('', 'User is deleted successfully');
          this.authService.logout();
          this.router.navigateByUrl('login');
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not delete user');
        }
      );
  }
}
