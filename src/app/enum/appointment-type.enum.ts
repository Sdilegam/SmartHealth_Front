import {DoctorSpeciality} from './doctor-speciality';

export enum AppointmentType {
  FirstConsultation,
  FollowUp,
  Vaccination,
  BloodTest,
  Screening,
  PrescriptionRenewal,
  MedicalCertificate,
  ChronicDiseaseFollowUp,
  MinorInjury,
  MentalHealthSupport,
  Teleconsultation,
  HealthCheckup,
  PregnancyFollowUp,
  PediatricCheckup
}


export const AppointmentTypeLabels: Record<AppointmentType, string> = {
  [AppointmentType.FirstConsultation]: 'Première consultation',
  [AppointmentType.FollowUp]: 'Consultation de suivi',
  [AppointmentType.Vaccination]: 'Vaccination',
  [AppointmentType.BloodTest]: 'Prise de sang',
  [AppointmentType.Screening]: 'Dépistage',
  [AppointmentType.PrescriptionRenewal]: 'Renouvellement d’ordonnance',
  [AppointmentType.MedicalCertificate]: 'Certificat médical',
  [AppointmentType.ChronicDiseaseFollowUp]: 'Suivi maladie chronique',
  [AppointmentType.MinorInjury]: 'Soins pour blessure légère',
  [AppointmentType.MentalHealthSupport]: 'Soutien santé mentale',
  [AppointmentType.Teleconsultation]: 'Téléconsultation',
  [AppointmentType.HealthCheckup]: 'Bilan de santé',
  [AppointmentType.PregnancyFollowUp]: 'Suivi de grossesse',
  [AppointmentType.PediatricCheckup]: 'Contrôle pédiatrique'
};
