export class UserEntity {
  constructor(
    public id: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public roles?: string,
    public courseName?: string,
    public status?: string
  ) {}
}
//
