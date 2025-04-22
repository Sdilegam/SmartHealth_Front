import {Component, ViewChild, OnInit, inject, AfterViewInit, AfterViewChecked} from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import resourceTimeGridPlugin  from '@fullcalendar/resource-timegrid';
import dayGridPlugin  from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import {Card} from 'primeng/card';
import {DoctorAvailability} from '../../../models/DoctorAvailability/doctor-availability.DTO';
import {DoctorService} from '../../../services/doctor.service';
import {ActivatedRoute} from '@angular/router';
import {Button} from 'primeng/button';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { createEventId } from '../../../event-utils';
@Component({
  imports: [
    FullCalendarModule,
    Card,
    Button
  ],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent {
  @ViewChild("calendar") calendarComponent!: FullCalendarComponent;
  doctorID!:number;
  doctorService = inject(DoctorService);
  calendarOptions: CalendarOptions = {
    plugins:[resourceTimeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locales:[frLocale],
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    selectConstraint: "businessHours",
    slotDuration:"00:30:00",
    snapDuration:"00:05:00",
    allDaySlot:false,
    selectOverlap:false,
    eventConstraint:"businessHours",
    eventOverlap:false,
    forceEventDuration:true,
    defaultTimedEventDuration:"01:30",
    businessHours: {
      daysOfWeek: [1],
      startTime: '12:00',
      endTime: '12:00',
    },
    select: this.handleDateSelect.bind(this),
    nowIndicator:true,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  }
  constructor() {
    inject(ActivatedRoute).params.subscribe(params => this.doctorID = params['id']);
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
     this.updateData()
  }
  nextWeek(){
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    this.updateData()
  }
  updateData(){
    let calendarApi = this.calendarComponent.getApi()
    if (calendarApi.getCurrentData().dateProfile.renderRange.end < new Date(Date.now())){
      this.calendarOptions.businessHours={
        daysOfWeek: [1],
        startTime: '12:00',
        endTime: '12:00',
      };
    }
    else{
    this.doctorService.getDoctorAvailability(this.doctorID, calendarApi.getCurrentData().dateProfile.renderRange)
      .subscribe({next: data => {
          console.log(data)
          this.calendarOptions.businessHours=data.workingHours;
          this.calendarOptions.events= data.slotsTaken
            .map(function(v){
              const startDate:Date = new Date(v.startDate)
              const endDate:Date = new Date(v.endDate)
              const title:string= `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")} - ${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;
              return {start:startDate, end:endDate, display:'background', classNames:v.classNames, title: title};
            });
        }})
    }
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        // constraint: "businessHours",
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
}
