import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: number;

  constructor() {
    this.id = 0;
  }

  setUserID(user: number) {
    this.id = user;
  }

  hasPremition(user: number) {
    console.log(this.id + ' - ' + user);
    return this.id === 1 || (this.id - user) === 0 ;
  }

  isLoggedIn() {
    return this.id !== 0;
  }
}
