export class PublicUser {
  constructor(
    public id: string,
    public username: string,
    public name: string,

    public website: string,
    public biography: string,

    public isPrivate: boolean,
  ) {}
}
