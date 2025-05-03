export enum DoctorSpeciality {
  GeneralPractitioner,
  Pediatrician,
  Cardiologist,
  Dermatologist,
  Neurologist,
  Psychiatrist,
  Oncologist,
  OrthopedicSurgeon,
  Radiologist,
  Anesthesiologist,
  Endocrinologist,
  Gastroenterologist,
  Hematologist,
  Nephrologist,
  Ophthalmologist,
  Otolaryngologist,
  Pulmonologist,
  Rheumatologist,
  Urologist,
  Gynecologist,
  Obstetrician,
  Surgeon,
  Pathologist,
  InfectiousDiseaseSpecialist,
  Immunologist,
  Geriatrician,
  PlasticSurgeon,
  EmergencyPhysician,
  FamilyMedicine
}

// Human-readable display names
const DoctorSpecialityLabelsFr: Record<DoctorSpeciality, string> = {
  [DoctorSpeciality.GeneralPractitioner]: 'Médecin généraliste',
  [DoctorSpeciality.Pediatrician]: 'Pédiatre',
  [DoctorSpeciality.Cardiologist]: 'Cardiologue',
  [DoctorSpeciality.Dermatologist]: 'Dermatologue',
  [DoctorSpeciality.Neurologist]: 'Neurologue',
  [DoctorSpeciality.Psychiatrist]: 'Psychiatre',
  [DoctorSpeciality.Oncologist]: 'Oncologue',
  [DoctorSpeciality.OrthopedicSurgeon]: 'Chirurgien orthopédiste',
  [DoctorSpeciality.Radiologist]: 'Radiologue',
  [DoctorSpeciality.Anesthesiologist]: 'Anesthésiste',
  [DoctorSpeciality.Endocrinologist]: 'Endocrinologue',
  [DoctorSpeciality.Gastroenterologist]: 'Gastroentérologue',
  [DoctorSpeciality.Hematologist]: 'Hématologue',
  [DoctorSpeciality.Nephrologist]: 'Néphrologue',
  [DoctorSpeciality.Ophthalmologist]: 'Ophtalmologiste',
  [DoctorSpeciality.Otolaryngologist]: 'ORL (Oto-rhino-laryngologiste)',
  [DoctorSpeciality.Pulmonologist]: 'Pneumologue',
  [DoctorSpeciality.Rheumatologist]: 'Rhumatologue',
  [DoctorSpeciality.Urologist]: 'Urologue',
  [DoctorSpeciality.Gynecologist]: 'Gynécologue',
  [DoctorSpeciality.Obstetrician]: 'Obstétricien',
  [DoctorSpeciality.Surgeon]: 'Chirurgien',
  [DoctorSpeciality.Pathologist]: 'Anatomo-pathologiste',
  [DoctorSpeciality.InfectiousDiseaseSpecialist]: 'Spécialiste des maladies infectieuses',
  [DoctorSpeciality.Immunologist]: 'Immunologiste',
  [DoctorSpeciality.Geriatrician]: 'Gériatre',
  [DoctorSpeciality.PlasticSurgeon]: 'Chirurgien plasticien',
  [DoctorSpeciality.EmergencyPhysician]: 'Médecin urgentiste',
  [DoctorSpeciality.FamilyMedicine]: 'Médecin de famille'
};

// Helper function
export function getDoctorSpecialityName(value: DoctorSpeciality): string {
  return DoctorSpecialityLabelsFr[value] ?? 'Specialité inconue';
}
