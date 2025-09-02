import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected title = 'Dating App';
  protected count = signal(0);
  // protected members: any;
  protected members = signal<any>([]);
  protected stringCollection : string[] = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
  protected greetings = `Hello my Name is ${this.title}`;

  async ngOnInit() {
    this.members.set(await this.accountService.Get_Members()); //this.getMembers()
    this.setCurrentUser();
    
    /* this.http.get('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),  //this.members = response,
      error: (error) => console.log(error),
      complete: () => console.log('Request completed')
    }); */
  }
setCurrentUser(){
  const userString = localStorage.getItem('user');
  if(!userString) return; // if userString is null, exit the function
  const user = JSON.parse(userString);
  this.accountService.currentUser.set(user);
}
  // Code moved to AccountService
  /* async getMembers() {
    try
    {
      return lastValueFrom (this.http.get('https://localhost:5001/api/members'));
    }
    catch(error)
    {
      console.log(error);
      throw error;
    }
  } */

  incrementSignal() : void {
    this.count.update(current => current + 2);
    console.log("Counted Signal", this.count());
  }
}
