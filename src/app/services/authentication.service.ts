import { Injectable } from "@angular/core";
import { LocalStorageService } from "app/services/local-storage.service.1";

@Injectable()
export class AuthenticationService {
  userIdKey = "user_id";

  constructor(private localStorageService: LocalStorageService) {}

  public setUser(user_id: string): void {
    this.localStorageService.set(this.userIdKey, user_id);
  }

  public getUserId(): string {
    return this.localStorageService.get(this.userIdKey);
  }
}

