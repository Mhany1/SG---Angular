import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router, private route: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  // logIn() {
  //   this.auth.login({ email: this.email?.value, password: this.password?.value }).subscribe(res => {
  //     if (res.status === 'success') {
  //       localStorage.setItem('token', res.authorisation.token)
  //       this.route.navigate(['/movies'])
  //     } else {
  //       this.route.navigate(['/signup'])
  //     }
  //   }, error => this.route.navigate(['/signup']))
  // }
}


