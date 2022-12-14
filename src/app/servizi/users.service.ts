import { Injectable } from '@angular/core';
import users from '../../data/users.json';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any = users;
  constructor() {}

  getUsers() {
    return this.users;
  }

  getUser(index: number) {
    return this.users[index];
  }
}
