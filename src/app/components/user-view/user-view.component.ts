import { Component, OnInit } from '@angular/core';

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {PublicUser} from "../../models/public-user.model";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  // @ts-ignore
  userObj: PublicUser = null;
  // @ts-ignore
  user: User = null;
  // @ts-ignore
  otherUserUsername: string = null;

  isFollowed: boolean = false;
  isMuted: boolean = false;
  isBlocked: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public activeRoute: ActivatedRoute,
    private tService: ToastrService,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.authService.getCurrentUser();
    this.activeRoute.params.subscribe(params => {
      this.otherUserUsername = params['username'];
    });

    this.userService.getPublicUserByUsername(this.otherUserUsername)
      .subscribe(
        (response: PublicUser) => {
          this.userObj = response;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could fetch user');
        }
      );
  }

  onFollowClick(event: MatSlideToggleChange): void {
    this.isFollowed = event.checked;

    //TODO: connect to following service
  }

  onMuteClick(event: MatSlideToggleChange): void {
    this.userService
      .changeIsMutedProfile(this.userObj.id, event.checked)
      .subscribe(
        () => {
          this.isMuted = event.checked;
          },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not change muted status of user.');
        }
      );
  }

  onBlockClick(event: MatSlideToggleChange): void {
    this.userService
      .changeIsBlockedProfile(this.userObj.id, event.checked)
      .subscribe(
        () => {
          this.isBlocked = event.checked;
          },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not change blocked status of user.');
        }
      );
  }

}
