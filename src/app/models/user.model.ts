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
    public isTaggable: boolean,

    public mutedProfiles: Array<string>,
    public blockedProfiles: Array<string>,

    public isBlocked: boolean,
    public createdAt: string,
    public deletedAt: string,
  ) {}
}
