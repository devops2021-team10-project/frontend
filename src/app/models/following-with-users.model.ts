import {PublicUser} from "./public-user.model";

export class FollowingWithUsersModel {
  constructor(
    public id: string,
    public followerUser: PublicUser,
    public followedUser: PublicUser,

    public isFollowing: boolean,
    public isMuted: boolean,
    public isBlocked: boolean,
    public isApproved: boolean,

    public createdAt: string,
    public deletedAt: string
  ) {}
}
