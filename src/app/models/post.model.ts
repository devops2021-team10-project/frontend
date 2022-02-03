import {Comment} from './comment.model';

export class Post {
  constructor(
    public id: string,
    public authorUserId: string,
    public imageInfo: any,
    public hashtags: string[],
    public description: string,
    public likedBy: string[],
    public dislikedBy: string[],
    public savedBy: string[],
    public comments: Comment[],

    public createdAt: string,
    public deletedAt: string
  ) {}
}
