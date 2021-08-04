import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isAuthenticated = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ]]
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }

      this.userService.authenticate();
      this.userService.loggedUser = this.f.email.value;
      this.isAuthenticated = this.userService.isAuthenticated;

      alert('Login successful!');

      this.router.navigate(['/cities']);
      
  }

  logout() {
    this.userService.logout();
    this.registerForm.reset();
    this.isAuthenticated = this.userService.isAuthenticated;
    this.submitted = false;
    this.router.navigate(['/home']);
  }
}
