import {Component, ViewChild, OnInit, inject, AfterViewInit, AfterViewChecked} from '@angular/core';
import {CalendarOptions, DateSelectArg, Calendar} from '@fullcalendar/core';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import {Card} from 'primeng/card';
import {DoctorService} from '../../../services/doctor.service';
import {ActivatedRoute} from '@angular/router';
import {Button} from 'primeng/button';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {createEventId} from '../../../event-utils';
import {AppointmentService} from '../../../services/appointment.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Dialog} from 'primeng/dialog';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentType, AppointmentTypeLabels} from '../../../enum/appointment-type.enum';
import {Select} from 'primeng/select';
import {enumToSelectOptions} from '../../../utils/enumToSelectOptions';
import { TextareaModule } from 'primeng/textarea';
import {formatDate} from '@angular/common';

@Component({
  imports: [
    FullCalendarModule,
    Card,
    Button,
    ConfirmDialog,
    Select,
    ReactiveFormsModule,
    TextareaModule
  ],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
export class DoctorAppointmentComponent {
  @ViewChild("calendar") calendarComponent!: FullCalendarComponent;
  doctorID!: number;
  calAPI!: Calendar;
  appointmentTypes = enumToSelectOptions(AppointmentType, AppointmentTypeLabels)
  doctorName!:string;

  doctorService = inject(DoctorService);
  formBuilder = inject(FormBuilder);
  appointmentService = inject(AppointmentService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  calendarOptions: CalendarOptions = {
    plugins: [resourceTimeGridPlugin, interactionPlugin],
    headerToolbar: {
      right: 'todayCustom prevCustom,nextCustom'
    },
    initialView: 'timeGridWeek',
    timeZone: "local",
    locales: [frLocale],
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    selectConstraint: "businessHours",
    slotDuration: "00:30:00",
    snapDuration: "00:30:00",
    allDaySlot: false,
    selectOverlap: false,
    eventConstraint: "businessHours",
    eventOverlap: false,
    forceEventDuration: true,
    defaultTimedEventDuration: "01:30",

    businessHours: {
      daysOfWeek: [1],
      startTime: '12:00',
      endTime: '12:00',
    },
    customButtons: {
      prevCustom: {
        icon: 'chevron-left',
        click: () => {
          this.previousWeek()
        }
      },
      nextCustom: {
        icon: 'chevron-right',
        click: () => {
          this.nextWeek()
        }
      },
      todayCustom: {
        text: "Aujourd'hui",
        click: () => {
          this.goToToday()
        }
      },
    },
    select: this.handleDateSelect.bind(this),
    nowIndicator: true,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  }
  newAppointmentForm = this.formBuilder.group({
    type: [null, [Validators.required]],
    notes: [null, []]
  })

  constructor() {
    inject(ActivatedRoute).params.subscribe(params => this.doctorID = params['id']);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.calAPI = this.calendarComponent.getApi()
    this.updateData()

  }

  nextWeek() {
    this.calAPI.next();
    this.updateData()
  }

  previousWeek() {
    this.calAPI.prev();
    this.updateData();
  }

  goToToday() {
    this.calAPI.today();
    this.updateData();
  }

  updateData() {
    if (this.calAPI.getCurrentData().dateProfile.renderRange.end < new Date(Date.now())) {
      this.calendarOptions.businessHours = {
        daysOfWeek: [1],
        startTime: '12:00',
        endTime: '12:00',
      };
    } else {
      this.doctorService.getDoctorAvailability(this.doctorID, this.calAPI.getCurrentData().dateProfile.renderRange)
        .subscribe({
          next: data => {
            console.log(data)
            this.doctorName = data.doctorName;
            this.calendarOptions.businessHours = data.workingHours;
            this.calendarOptions.events = data.slotsTaken
              .map(function (v) {
                const startDate: Date = new Date(v.startDate + 'Z')
                const endDate: Date = new Date(v.endDate + 'Z')
                const title: string = `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")} - ${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;
                return {start: startDate, end: endDate, display: 'background', classNames: v.classNames, title: title};
              });
          }
        })
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;


    this.confirmationService.confirm({
      header: formatDate(selectInfo.start,'EE dd/MM/yy, HH:mm:ss', 'fr-BE')??"",
      accept: () => {
        calendarApi.unselect(); // clear date selection
        console.log(this.newAppointmentForm.controls.type.value ?? 0)
        this.appointmentService.NewAppointment(this.doctorID, {
          start: new Date(selectInfo.startStr),
          duration: 30,
          appointmentType: this.newAppointmentForm.controls.type.value ?? 0
        }).subscribe({
          next: data => {
            console.log(this.newAppointmentForm.controls.type.value)
            calendarApi.addEvent({
              id: createEventId(),
              constraint: "businessHours",
              title: AppointmentTypeLabels[data.appointmentType],
              start: data.start,
              end: new Date(data.start).getTime() + data.duration * 60000,
            });
            this.messageService.add({severity: 'info', summary: "Rendez-vous créé"});
            this.newAppointmentForm.reset()
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: error.error});
          }
        })
      }
    })
  }

  protected readonly AppointmentType = AppointmentType;
}



