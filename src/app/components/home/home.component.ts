import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../mymodal/mymodal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { $$ } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  calendarEvents = [];
  showModal = false;
  editForm: FormGroup;
  isSubmitted = false;


  constructor(private eventService: EventService, private router: Router, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  get formControls() { return this.editForm.controls; }

  ngOnInit() {

    this.eventService.getAll().subscribe(
      (res) => {
        res.forEach(value => {
          this.calendarEvents.push({ id: value.id, title: value.name, date: value.created });
        });
      },
      (error) => {
        console.log(error);
        alert(error.message);
        this.router.navigateByUrl('logout');
      }
    );

  }

  editEvent() {

    this.isSubmitted = true;

    if (this.editForm.invalid) {
      return;
    }

    let created  = this.editForm.value.date + ' ' + this.editForm.value.time;

    this.eventService.update(this.editForm.value.id, this.editForm.value.title, created)
      .subscribe(
        (res) => {
          this.refreshEvent(this.editForm.value.id, this.editForm.value.title, created);
          alert("Update OK!");
          this.toggleModal(false);
        },
        (error) => {
          console.log(error);
          alert("Error Update!");
        }
      );

      return false;
  }

  refreshEvent(id, title, created){
    console.log(this.calendarEvents);
    this.calendarEvents.forEach( function(element){
        if(element.id  == id){
          element.title = title;
          element.date = created;
        }

    });
        
  
  }

  handleDateClick(info) { 
    //let date = new Date(info.event.start);
    //let dateformat = date.getFullYear() + "-" + date.getMonth() + "-"+ date.getDay();
    console.log(new Date(info.event.start).toTimeString().split(' ')[0]);
    this.editForm.setValue({
      id: info.event.id,
      title: info.event.title,
      date: new Date(info.event.start).toISOString().slice(0,10),
      time: new Date(info.event.start).toTimeString().split(' ')[0]
    })
    this.toggleModal(true);
  }

  /*  TODO: Este el modo mal simple para abrir model, utilizando ng-bootstrap me parece 
  *   muy complejo, una tarea tan simple como abrir un modal
  */
  toggleModal(state) {
    this.showModal = state;
  }
}
