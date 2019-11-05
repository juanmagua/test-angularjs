import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  constructor(private jwtService: JwtService, private router: Router) { }

  ngOnInit() {

      this.jwtService.logout();
    
      this.router.navigateByUrl('login');
  }

}
