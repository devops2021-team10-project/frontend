export class CreateUser {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public name: string,
    public phoneNumber: string,
    public gender: string,
    public birthday: string,
    public website: string,
    public biography: string
  ) {}
}
