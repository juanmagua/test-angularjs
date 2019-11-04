import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];

  calendarEvents = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    
    this.eventService.getAll().subscribe(
      (res) => {
       res.forEach(value => {
          this.calendarEvents.push({ title: value.name, date: value.created });
        });
      },
      (error) => {
        console.log(error);
        alert(error.message);
        this.router.navigateByUrl('logout');
      }
    );

  }

  
  handleDateClick(arg) { // handler method
    alert(arg.dateStr);
  }

}
