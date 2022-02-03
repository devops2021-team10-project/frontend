import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PublicUser} from "../../models/public-user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {FollowingService} from "../../services/following.service";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {Following} from "../../models/following.model";
import {FollowingWithUsersModel} from "../../models/following-with-users.model";


@Component({
  selector: 'app-following-control',
  templateUrl: './following-control.component.html',
  styleUrls: ['./following-control.component.css']
})
export class FollowingControlComponent implements OnInit, AfterViewInit {

  authUser: User | undefined;

  showFollowers: boolean | undefined = true;
  showFollowing: boolean | undefined = false;
  showRequests: boolean | undefined = false;

  displayedColumns: string[] = ['followerFullName', 'followerUsername', 'followerView'];
  dataSource = new MatTableDataSource<FollowingWithUsersModel>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private followingService: FollowingService,
    private userService: UserService,
    private authService: AuthService,
    private tService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authUser = this.authService.getCurrentUser();

    this.loadFollowers();
  }

  onShowFollowersClick(event: MatSlideToggleChange): any {
    this.showFollowers = event.checked;
    if (event.checked) {
      this.displayedColumns = ['followerFullName', 'followerUsername', 'followerView'];
      this.showFollowing = false;
      this.showRequests = false;

      this.loadFollowers();
    }
  }

  loadFollowers(): any {
    this.dataSource = new MatTableDataSource<FollowingWithUsersModel>([]);
    this.followingService
      .findAllWhoFollowMe()
      .subscribe(
        async (response: Following[]) => {
          let followingWithUsers: FollowingWithUsersModel[] = [];
          for (let following of response) {
            followingWithUsers.push(await this.makeFollowingWithUsers(following));
          }

          this.dataSource = new MatTableDataSource<FollowingWithUsersModel>(followingWithUsers);
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could load followers');
        }
      );
  }

  onShowFollowingClick(event: MatSlideToggleChange): any {
    this.showFollowing = event.checked;
    if (event.checked) {
      this.displayedColumns = ['followedFullName', 'followedUsername', 'followedView'];
      this.showFollowers = false;
      this.showRequests = false;

      this.loadFollowed();
    }
  }

  loadFollowed(): any {
    this.dataSource = new MatTableDataSource<FollowingWithUsersModel>([]);
    this.followingService
      .findAllWhoIFollow()
      .subscribe(
        async (response: Following[]) => {
          let followingWithUsers: FollowingWithUsersModel[] = [];
          for (let following of response) {
            followingWithUsers.push(await this.makeFollowingWithUsers(following));
          }
          this.dataSource = new MatTableDataSource<FollowingWithUsersModel>(followingWithUsers);
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could load followings');
        }
      );
  }

  onShowRequestsBlockClick(event: MatSlideToggleChange): any {
    this.showRequests = event.checked;
    if (event.checked) {
      this.displayedColumns = ['followerFullName', 'followerUsername', 'followerView', 'approve'];
      this.showFollowing = false;
      this.showFollowers = false;

      this.loadRequests();
    }
  }


  loadRequests(): any {
    this.dataSource = new MatTableDataSource<FollowingWithUsersModel>([]);
    this.followingService
      .findAllMyReceivedFollowRequests()
      .subscribe(
        async (response: Following[]) => {
          let followingWithUsers: FollowingWithUsersModel[] = [];
          for (let following of response) {
            followingWithUsers.push(await this.makeFollowingWithUsers(following));
          }
          this.dataSource = new MatTableDataSource<FollowingWithUsersModel>(followingWithUsers);
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
          this.tService.warning(err.error.msg, 'Could load following requests');
        }
      );
  }

  async makeFollowingWithUsers(following: Following): Promise<any> {
    return new FollowingWithUsersModel(
      following.id,
      (await this.userService.getPublicUserById(following.followerUserId).toPromise()),
      (await this.userService.getPublicUserById(following.followedUserId).toPromise()),

      following.isFollowing,
      following.isMuted,
      following.isBlocked,
      following.isApproved,

      following.createdAt,
      following.deletedAt
    );
  }

  approve(userId: string): void {
    this.followingService
      .approve(userId)
      .subscribe(
        () => {
          this.loadRequests();
        },
        err => {
        console.log(err);
        this.tService.warning(err.error.msg, 'Could approve request');
      });
  }

  viewUser(username: string): void {
    this.router.navigateByUrl('users/' + username);
  }

}
