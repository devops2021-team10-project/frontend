export class Comment {
  constructor(
    public id: string,
    public authorId: string,
    public text: string,
    public createdAt: string,
    public deletedAt: string
  ) {}
}
