export class Comment {
  constructor(
    public id: string,
    public authorUserId: string,
    public comment: string,
    public createdAt: string,
    public deletedAt: string
  ) {}
}
