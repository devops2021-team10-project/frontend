import {Component, OnInit} from '@angular/core';

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {PublicUser} from "../../models/public-user.model";
import {Post} from "../../models/post.model";
import {Comment} from '../../models/comment.model';

import {PostService} from "../../services/post.service";
import {PostWithUsers} from "../../models/post-with-users.model";
import {CommentWithUsers} from "../../models/comment-with-users.model";

import { DomSanitizer } from '@angular/platform-browser';

import format from 'date-fns/format';



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

  // @ts-ignore
  posts: PostWithUsers[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    public activeRoute: ActivatedRoute,
    private tService: ToastrService,
    private sanitizer: DomSanitizer
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

    this.getPosts();
    console.log(this.posts);
  }

  formatDate(timestamp: string): any {
    return format(new Date(timestamp), "dd.MM.yyyy. HH:mm");
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

  async getPosts(): Promise<any> {
    this.postService
      .getPostsByUserId(this.user.id)
      .subscribe(
        async (response: Post[]) => {
          let postsWithUsers: PostWithUsers[] = [];
          for (let post of response) {
            let postWithUsers = new PostWithUsers(
              post.id,
              (await this.getPublicUsers([post.authorUserId]))[0],
              await this.getImage(post.id),
              post.hashtags,
              post.description,
              await this.getPublicUsers(post.likedBy),
              await this.getPublicUsers(post.dislikedBy),
              await this.getPublicUsers(post.savedBy),
              await (async () => {
                let commentsWithUsers: CommentWithUsers[] = [];
                for (let c of post.comments) {
                  commentsWithUsers.push(await this.makeCommentWithUsers(c));
                }
                return commentsWithUsers;
              })(),
              post.createdAt,
              post.description
            );
            postsWithUsers.push(postWithUsers);
          }

          this.posts = postsWithUsers;
          console.log("ALL POSTS: ")
          console.log(postsWithUsers);
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not load posts.');
        }
      );
  }

  async getImage(postId: string): Promise<any> {
    let imageBlob = null;
    try {
      imageBlob = await this.postService.getPostImageById(postId).toPromise();
    } catch (err) {
      console.log(err);
      this.tService.warning(err.error.msg, 'Could not get user');
    }
    let objectURL = URL.createObjectURL(imageBlob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  async getPublicUsers(userIds: string[]): Promise<PublicUser[]> {
    let publicUsers: PublicUser[] = [];
    for (let userId of userIds) {
      publicUsers.push(await this.makePublicUser(userId));
    }
    console.log("PUBLIC USERSS:" );
    console.log(publicUsers);
    return publicUsers;
  }

  async makePublicUser(userId: string): Promise<PublicUser> {
    // @ts-ignore
    let publicUser: PublicUser = null;
    try {
      publicUser = await this.userService.getPublicUserById(userId).toPromise();
    } catch (err) {
      console.log(err);
      this.tService.warning(err.error.msg, 'Could not get user');
    }
    return publicUser;
  }

  async makeCommentWithUsers(comment: Comment): Promise<any> {
    const publicUser = (await this.getPublicUsers([comment.authorUserId]))[0];
    return new CommentWithUsers(
      comment.id,
      publicUser,
      comment.comment,
      comment.createdAt,
      comment.deletedAt
    );
  }

}
