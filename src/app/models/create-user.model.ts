export class CreateUser {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public name: string,
  ) {}
}
