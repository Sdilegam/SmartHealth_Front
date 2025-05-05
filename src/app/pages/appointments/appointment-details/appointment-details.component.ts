import {Component, inject} from '@angular/core';
import {AppointmentService} from '../../../services/appointment.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Card} from 'primeng/card';
import {AppointmentDetails_ViewModel} from '../../../models/Appointment/AppointmentDetails_ViewModel';
import {AppointmentDetailsDTOToViewModel} from '../../../mappers/AppointmentMappers';
import {DatePipe, formatDate} from '@angular/common';
import {Divider} from 'primeng/divider';
import {AppointmentTypeLabels} from '../../../enum/appointment-type.enum';
import {AppointmentStatusLabels} from '../../../enum/appointment-status.enum';
import {Textarea} from 'primeng/textarea';
import {FloatLabel} from 'primeng/floatlabel';
import {SessionService} from '../../../services/session.service';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MedecineListItemDTO} from '../../../models/medecine/medecine-list-item.DTO';
import {getLanguageNamesFromFlags} from '../../../enum/languages';
import {getDoctorSpecialityName} from '../../../enum/doctor-speciality';
import {createEventId} from '../../../event-utils';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MedecineService} from '../../../services/medecine.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-appointment-details',
  imports: [
    Card,
    DatePipe,
    Divider,
    RouterLink,
    Textarea,
    FloatLabel,
    Button,
    TableModule,
    ConfirmDialog,
    ReactiveFormsModule,
    InputText,
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {

  appointmentDetails!: AppointmentDetails_ViewModel;
  appointmentService = inject(AppointmentService);
  sessionService = inject(SessionService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService)
  medecineService = inject(MedecineService)
  formBuilder = inject(FormBuilder);

  newMedecineForm = this.formBuilder.group({
    name: ['', Validators.required],
    quantity: ['', Validators.required],
    instructions: ['', Validators.required],
  })

  medecineList: Array<MedecineListItemDTO> = [{
    medecineID: 1,
    instructions: "SAFFASD",
    name: "Dafalgan",
    isBought: false,
    quantity: "4tablette/semaine"
  }]
  appointmentID: number = -1;

  Columns = [
    {field: 'medecineName', Name: 'Nom du médicament'},
    {field: 'qty', Name: 'Quantité'},
    {field: "instructions", Name: "Instructions"},
    {field: "delete", Name: ""},
  ]

  constructor() {
    inject(ActivatedRoute).params.subscribe(params => this.appointmentID = params['appointmentID']);

    this.appointmentService.getAppointmentDetails(this.appointmentID).subscribe(appointmentDetail => {
      this.appointmentDetails = AppointmentDetailsDTOToViewModel(appointmentDetail);
      console.log(this.appointmentDetails);
      this.medecineService.getMedecineFromAppointment(this.appointmentID).subscribe(medecineFromAppointment => {this.medecineList = medecineFromAppointment})
    })
  }

  addMedecine() {
    this.confirmationService.confirm({
      header: "Ajouter un medicament",
      accept: () => {
        this.medecineService.newMedecine(this.appointmentDetails.appointmentID, this.newMedecineForm.value).subscribe({
          next: data => {
            this.medecineList.push(data);
            this.messageService.add({severity: 'info', summary: "Nouveau medicament ajouté"});
            this.newMedecineForm.reset()
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: error.error});
          }
        })
      }
    })
  }


  protected readonly AppointmentTypeLabels = AppointmentTypeLabels;
  protected readonly AppointmentStatusLabels = AppointmentStatusLabels;
  protected readonly getLanguageNamesFromFlags = getLanguageNamesFromFlags;
  protected readonly getDoctorSpecialityName = getDoctorSpecialityName;
}
