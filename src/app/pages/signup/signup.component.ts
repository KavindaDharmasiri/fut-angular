import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Signup successful. You can log in now.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Signup failed';
      }
    });
  }
}
