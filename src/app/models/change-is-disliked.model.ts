export class ChangeIsDislikedModel {
  constructor(
    public toDislikePostId: string,
    public isDisliked: boolean,
  ) {}
}
