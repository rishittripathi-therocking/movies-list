import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  showError = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  loginData() {
    let item = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    if(item.email === "abc@gmail.com" && item.password === "admin123"){
      localStorage.setItem('currentUser', 'true');
      this.router.navigate(['/home']);
      // this.snackBar.open("Login successfully", 'Dismiss', { duration: 3000 });
    } else {
      this.showError = true;
      // this.snackBar.open("Incorrect userName or password", 'Dismiss', { duration: 3000 });
    }
  }

  onChange() {
    this.showError = false;
  }
  ngOnInit() {
  }
}
