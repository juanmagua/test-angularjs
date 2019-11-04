import { Component } from '@angular/core';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angularjs';
  loggedIn = this.jwtService.loggedIn();

  constructor(private jwtService: JwtService) {
   }
}
