import { Component } from '@angular/core';
import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'test-angularjs';
  
  constructor(private location: Location, private router: Router) {
   }
}
