export class CreateNewCommentModel {
  constructor(
    public postId: string,
    public text: string,
  ) {}
}
