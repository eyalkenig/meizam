import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
