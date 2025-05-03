import {Component, inject} from '@angular/core';
import {DoctorListItem} from '../../../models/doctor/doctor-list-item.DTO';
import {MessageService} from 'primeng/api';
import {DoctorService} from '../../../services/doctor.service';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import {DoctorLanguagesLabelsFr, getLanguageNamesFromFlags} from '../../../enum/languages';
import {getDoctorSpecialityName} from '../../../enum/doctor-speciality';

@Component({
  imports: [
    Button,
    Card,
    TableModule,
    RouterLink
  ],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
  doctorList:Array<DoctorListItem> = null!;
  expandedRows = {}
  messageService = inject(MessageService);
  doctorService = inject(DoctorService)
  Columns = [
    {field:'picture', Name:'Photo'},
    {field:'name', Name:'Nom'},
    {field:"location", Name:"Addresse"},
    {field:"languages", Name:"Langues parlées"},
    {field: 'expandToggler', Name:''}
  ]
  constructor() {
    this.doctorService.getAllDoctors().subscribe(doctors => {
      this.doctorList = doctors
      console.log(this.doctorList)
    });
  }

  protected readonly getLanguageNamesFromFlags = getLanguageNamesFromFlags;
  protected readonly DoctorLanguagesLabelsFr = DoctorLanguagesLabelsFr;
  protected readonly getDoctorSpecialityName = getDoctorSpecialityName;
}
