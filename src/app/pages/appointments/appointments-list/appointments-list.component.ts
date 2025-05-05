import {Component, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {AppointmentList_ViewModel} from '../../../models/Appointment/AppointmentList_ViewModel';
import {AppointmentService} from '../../../services/appointment.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AppointmentListItemDTOToViewModel} from '../../../mappers/AppointmentMappers';
import {DatePipe} from '@angular/common';
import {AppointmentTypeLabels} from '../../../enum/appointment-type.enum';
import {Tag} from 'primeng/tag';
import {AppointmentStatusLabels} from '../../../enum/appointment-status.enum';
import {Button} from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-appointments-list',
  imports: [
    Card,
    DatePipe,
    Tag,
    Button,
    ConfirmDialog,
    RouterLink,
  ],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent {
  appointmentList: Array<AppointmentList_ViewModel> = []
  ID!: number;

  appointmentService = inject(AppointmentService);
  confirmationService=inject(ConfirmationService);
  messageService=inject(MessageService);

  constructor() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      if(appointments)
      this.appointmentList = appointments.map(a => AppointmentListItemDTOToViewModel(a))
    })
  }
  confirm1(event:Event, id:number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment annuler ce rendez-vous?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Non',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Annuler le rendez-vous',
        severity: 'danger',
      },
      accept: () => {
        this.cancel(id)
      },
    });
  }
  cancel(id:number){
    this.appointmentService.cancelAppointment(id).subscribe({next: ()=>{
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous avez annulé le rdv' });
        this.appointmentService.getAppointments().subscribe(appointments => {
          if(appointments)
            this.appointmentList = appointments.map(a => AppointmentListItemDTOToViewModel(a))
        })
    },
      error: error => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: error.error });
      }
    })
  }

  protected readonly AppointmentTypeLabels = AppointmentTypeLabels;
  protected readonly AppointmentStatusLabels = AppointmentStatusLabels;

}
