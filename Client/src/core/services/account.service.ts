import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private base_URL = 'https://localhost:5001/api/';

  public currentUser = signal<User | null>(null);
  async Get_Members() {
    try {
      return lastValueFrom(this.http.get(this.base_URL + 'members'));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
  /*  async Get_MembersById() {
     try {
       return this.http.get(this.base_URL + 'members').pipe(
         map(members => {
           console.log(members.id);
 
         })
       );
     }
     catch (error) {
       console.log(error);
       throw error;
     }
   } */

  Post_login(creds: any) {
    return this.http.post<User>(this.base_URL + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    )
  }

  Post_LogOut(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
