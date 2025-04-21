export enum Languages {
  None        = 0,
  French      = 1 << 0,
  Dutch       = 1 << 1,
  English     = 1 << 2,
  German      = 1 << 3,
  Spanish     = 1 << 4,
  Arabic      = 1 << 5,
  Turkish     = 1 << 6,
  Italian     = 1 << 7,
  Portuguese  = 1 << 8,
  Romanian    = 1 << 9,
  Polish      = 1 << 10,
  Russian     = 1 << 11,
  Chinese     = 1 << 12,
  Bulgarian   = 1 << 13,
  Farsi       = 1 << 14,
  Ukrainian   = 1 << 15
}

export const DoctorLanguagesLabelsFr: Record<string, string> = {
  None: 'Aucune',
  French: 'Français',
  Dutch: 'Néerlandais',
  English: 'Anglais',
  German: 'Allemand',
  Spanish: 'Espagnol',
  Arabic: 'Arabe',
  Turkish: 'Turc',
  Italian: 'Italien',
  Portuguese: 'Portugais',
  Romanian: 'Roumain',
  Polish: 'Polonais',
  Russian: 'Russe',
  Chinese: 'Chinois',
  Bulgarian: 'Bulgare',
  Farsi: 'Persan (Farsi)',
  Ukrainian: 'Ukrainien'
};

export function getLanguageNamesFromFlags(flags: number): string[] {
  return Object.entries(Languages)
    .filter(([key, value]) => isNaN(Number(key))) // exclude reverse mapping
    .filter(([_, value]) => (flags & (value as number)) !== 0)
    .map(([key, value]) => DoctorLanguagesLabelsFr[key] || key);
}
