import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Token} from '../../models/token.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private tService: ToastrService) {
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    // console.log('Username: ' + this.loginForm.value.username);
    // console.log('Password: ' + this.loginForm.value.password);
    if (this.loginForm?.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (response: Token) => {
            sessionStorage.setItem('accessToken', response.accessToken);
            console.log("Logged in!")
            this.tService.success('User successfully logged in.', 'Success');
            this.authService.getAndSaveAuthenticatedUser();
            this.router.navigate(['/feed']);
          },
          err => {
            if (err.status === 400) {
              this.tService.warning('Error', 'Warning');
              this.loginForm.patchValue({
                username: '',
                password: '',
              });
              this.loginForm.markAsPristine();
              this.loginForm.markAsUntouched();
            }
            else {
              console.log('Error: ' + JSON.stringify(err));
            }
          }
        );
    }
  }


}
