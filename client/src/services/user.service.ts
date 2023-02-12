import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import User from 'src/Models/User';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  currentUsers = new BehaviorSubject<User[]>([]);

  routeUrl = `${environment.baseUrl}/User`;

  constructor(public http: HttpClient) { }

  setInStorage(users) {
    localStorage.setItem("currentUsers", JSON.stringify(users));
  }

  getFromStorage() {
    let u = localStorage.getItem("currentUsers");
    if (!u)
      return null;
      console.log(JSON.parse(u))
    return JSON.parse(u);
  }

  removeFromStorage() {
    localStorage.removeItem("currentUsers");
  }
  getAllUser() {
    return this.http.get<User[]>(this.routeUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.routeUrl}/${id}`);
  }
  putUser(u: User) {
    return this.http.put<User>(`${this.routeUrl}`, u);
  }

  postUser(u: User) {
    console.log(u);
    return this.http.post<User>(this.routeUrl, u);
  }
  deleteUser(id:number){
    return this.http.delete<User>(`${this.routeUrl}/${id}`);
  }
}