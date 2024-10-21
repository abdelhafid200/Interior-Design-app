import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId : number | null = null

  constructor() { }

  setUserId(id: number): void {
    this.userId = id
  }

  getUserId() {
    return this.userId ;
  }
}
