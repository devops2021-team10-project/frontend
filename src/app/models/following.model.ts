
export class Following {
  constructor(
    public id: string,
    public followerUserId: string,
    public followedUserId: string,

    public isFollowing: boolean,
    public isMuted: boolean,
    public isBlocked: boolean,
    public isApproved: boolean,

    public createdAt: string,
    public deletedAt: string
  ) {}
}
