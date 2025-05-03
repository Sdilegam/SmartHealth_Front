import {AppointmentType} from './appointment-type.enum';

export enum AppointmentStatus {
  Scheduled,
  InProgress,
  Completed,
  Cancelled,
  Postponed
}

export const AppointmentStatusLabels: { [key in AppointmentStatus]: string } = {
  [AppointmentStatus.Scheduled]: 'Planifié',
  [AppointmentStatus.InProgress]: 'En cours',
  [AppointmentStatus.Completed]: 'Terminé',
  [AppointmentStatus.Cancelled]: 'Annulé',
  [AppointmentStatus.Postponed]: 'Reporté'
};
