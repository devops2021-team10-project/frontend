import {PublicUser} from "./public-user.model";

export class CommentWithUsers {
  constructor(
    public id: string,
    public authorUser: PublicUser,
    public text: string,
    public createdAt: string,
    public deletedAt: string
  ) {}
}
