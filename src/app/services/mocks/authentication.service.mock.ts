import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationServiceMock {

  public setUser(user_id: string): void {}

  public getUserId(): string { return "a-user-id" }
}

