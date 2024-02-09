import Cookies from "universal-cookie";

export interface IStorageService {
  setItem(key: string, value: string): void;

  getItem(key: string): string | null;

  removeItem(key: string): void;
}

export class StorageServiceImpl implements IStorageService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export class CookiesServiceImpl implements IStorageService {
  cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setItem(key: string, value: string): void {
    this.cookies.set(key, value);
  }

  getItem(key: string): string | null {
    return this.cookies.get(key);
  }
  removeItem(key: string): void {
    this.cookies.remove(key);
  }
}
