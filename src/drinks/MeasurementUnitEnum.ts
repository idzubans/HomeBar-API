const MeasurementUnits = [
  'OZ',
  'ML',
  'DASH',
  'SLICE',
  'PEEL',
  'WHOLE',
  'SPOON',
] as const;

export type MeasurementUnit = typeof MeasurementUnits[number];

