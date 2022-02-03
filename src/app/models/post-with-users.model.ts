import {PublicUser} from "./public-user.model";
import {CommentWithUsers} from "./comment-with-users.model";

export class PostWithUsers {
  constructor(
    public id: string,
    public authorUser: PublicUser,
    public imageInfo: any,
    public hashtags: string[],
    public description: string,
    public isLiked: boolean,
    public isDisliked: boolean,
    public comments: CommentWithUsers[],

    public newComment: string,

    public createdAt: string,
    public deletedAt: string
  ) {}
}
