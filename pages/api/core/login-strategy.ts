import { getMock } from "../../mocks";

export class LoginContext {
  private strategy: ILoginStrategy;
  constructor(strategy: ILoginStrategy) {
    console.log("Login Strategy", strategy);
    this.strategy = strategy;
  }
  public useLogin(user: string, password: string): IUser {
    console.log("Now Login is on Fire");
    return this.strategy.login(user, password);
  }
}

class LoginWithMock implements ILoginStrategy{
    public login(user: string, password: string) {
        const users = getMock.users 
        const checkUser = users.find((userItem:{user:string, password:string})=>{
            return userItem.user === user && userItem.password === password
        })
        let loginState = {state:false,token:''}
        if(checkUser) {
            loginState = {state:true,token:()}
        }
        return loginState
    }
}
 