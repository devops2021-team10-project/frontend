import {Component, OnInit} from '@angular/core';

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {FollowingService} from "../../services/following.service";

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
import {ChangeIsLikedModel} from "../../models/change-is-liked.model";
import {ChangeIsDislikedModel} from "../../models/change-is-disliked.model";
import {CreateNewCommentModel} from "../../models/create-new-comment.model";


@Component({
  selector: 'app-view-liked-disliked',
  templateUrl: './view-liked-disliked.component.html',
  styleUrls: ['./view-liked-disliked.component.css']
})
export class ViewLikedDislikedComponent implements OnInit {


  // @ts-ignore
  showFeed: boolean;
  authUser: User | undefined;
  showLiked: boolean = true;

  // @ts-ignore
  posts: PostWithUsers[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private followingService: FollowingService,
    public activeRoute: ActivatedRoute,
    private tService: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.authUser = this.authService.getCurrentUser();

    if (this.authUser !== undefined && this.authUser !== null) {
      this.showFeed = true;
      this.getLikedPosts();
    }
  }

  formatDate(timestamp: string): any {
    return format(new Date(timestamp), "dd.MM.yyyy. HH:mm");
  }

  onShowLiked(event: any): void {
    if (event.checked) {
      this.getLikedPosts();
      this.showLiked = true;
    } else {
      this.getDislikedPosts();
      this.showLiked = false;
    }
  }


  onCreateNewComment(post: PostWithUsers, text: string): any {
    const data = new CreateNewCommentModel(post.id, text);
    this.postService
      .createComment(data)
      .subscribe(
        async (response: Comment) => {
          post.comments.push(await this.makeCommentWithUsers(response));
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not unblock user.');
        });
  }

  async getLikedPosts(): Promise<any> {
    this.postService
      .getLiked()
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
              this.searchIdsForPostData(post.likedBy),
              this.searchIdsForPostData(post.dislikedBy),
              await (async () => {
                let commentsWithUsers: CommentWithUsers[] = [];
                for (let c of post.comments) {
                  commentsWithUsers.push(await this.makeCommentWithUsers(c));
                }
                return commentsWithUsers;
              })(),
              "",
              post.createdAt,
              post.description
            );
            postsWithUsers.push(postWithUsers);
          }

          this.posts = postsWithUsers;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not load posts.');
        }
      );
  }

  async getDislikedPosts(): Promise<any> {
    this.postService
      .getUnliked()
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
              this.searchIdsForPostData(post.likedBy),
              this.searchIdsForPostData(post.dislikedBy),
              await (async () => {
                let commentsWithUsers: CommentWithUsers[] = [];
                for (let c of post.comments) {
                  commentsWithUsers.push(await this.makeCommentWithUsers(c));
                }
                return commentsWithUsers;
              })(),
              "",
              post.createdAt,
              post.description
            );
            postsWithUsers.push(postWithUsers);
          }

          this.posts = postsWithUsers;
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

  searchIdsForPostData(likedBy: string[]): boolean {
    return likedBy.includes(<string>this.authUser?.id);
  }

  onLikeClick(event: MatSlideToggleChange, post: PostWithUsers) {
    const data = new ChangeIsLikedModel(post.id, event.checked);
    this.postService
      .changeIsLiked(data)
      .subscribe(
        () => post.isLiked = event.checked,
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not like/unlike post.');
        });

  }

  onDislikeClick(event: any, post: PostWithUsers) {
    const data = new ChangeIsDislikedModel(post.id, event.checked);
    this.postService
      .changeIsDisliked(data)
      .subscribe(
        () => post.isDisliked = event.checked,
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could not dislike/undislike post.');
        });

  }

  async getPublicUsers(userIds: string[]): Promise<PublicUser[]> {
    let publicUsers: PublicUser[] = [];
    for (let userId of userIds) {
      publicUsers.push(await this.makePublicUser(userId));
    }
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
    const publicUser = (await this.getPublicUsers([comment.authorId]))[0];
    return new CommentWithUsers(
      comment.id,
      publicUser,
      comment.text,
      comment.createdAt,
      comment.deletedAt
    );
  }

}
