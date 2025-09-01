import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private http = inject(HttpClient);
  protected title = 'Dating App';
  protected count = signal(0);
  // protected members: any;
  protected members = signal<any>([]);
  protected stringCollection : string[] = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];

  async ngOnInit() {
    this.members.set(await this.getMembers());
    /* this.http.get('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),  //this.members = response,
      error: (error) => console.log(error),
      complete: () => console.log('Request completed')
    }); */
  }

  async getMembers() {
    try
    {
      return lastValueFrom (this.http.get('https://localhost:5001/api/members'));
    }
    catch(error)
    {
      console.log(error);
      throw error;
    }
  }
  incrementSignal() {
    this.count.update(current => current + 2);
    console.log("Counted Signal", this.count());
  }
}
