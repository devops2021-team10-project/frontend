export class User {
  constructor(
    public id: string,
    public role: string,
    public username: string,
    public email: string,
    public name: string,

    public phoneNumber: string,
    public gender: string,
    public birthday: string,
    public website: string,
    public biography: string,

    public isPrivate: boolean,
    public followingData: null,

    public createdAt: string,
    public deletedAt: string,
  ) {}
}
