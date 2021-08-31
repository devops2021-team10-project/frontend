import {PublicUser} from "./public-user.model";
import {CommentWithUsers} from "./comment-with-users.model";

export class PostWithUsers {
  constructor(
    public id: string,
    public authorUser: PublicUser,
    public imageInfo: any,
    public hashtags: string[],
    public description: string,
    public likedBy: PublicUser[],
    public dislikedBy: PublicUser[],
    public savedBy: PublicUser[],
    public comments: CommentWithUsers[],

    public createdAt: string,
    public deletedAt: string
  ) {}
}
