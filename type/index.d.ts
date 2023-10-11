interface IUser {
  state: boolean;
  token: string;
}
interface ILoginStrategy {
  login(user: string, password: string): IUser;
}
