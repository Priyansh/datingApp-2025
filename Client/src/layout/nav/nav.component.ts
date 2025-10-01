import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected accountService = inject(AccountService);
  // protected hasLoggingIn = signal(false);
  protected creds : any = {
    email: '',
    password: ''
  };

  onLogin(): void{
    this.accountService.Post_login(this.creds).subscribe({
      next: response => 
        { 
          console.log(response) 
          //this.hasLoggingIn.set(true);
          this.creds = {};
        },
        error: error => alert(error.message)
      });
  }

  onLogout() : void
  {
    //this.hasLoggingIn.set(false);
    this.accountService.Post_LogOut();
  }

}
