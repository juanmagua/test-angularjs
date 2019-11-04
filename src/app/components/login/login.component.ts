import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isSubmitted = false;

  constructor(private jwtService: JwtService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //
  get formControls() { return this.loginForm.controls; }

  login() {

    console.log(this.loginForm.value);

    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.jwtService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.router.navigateByUrl('home');
        },
        (error) => {
            console.log("invalid login");
        }
      );

    //this.jwtService.login(this.loginForm.value.username, this.loginForm.value.password);

    //this.router.navigateByUrl('/home');
  }

}
