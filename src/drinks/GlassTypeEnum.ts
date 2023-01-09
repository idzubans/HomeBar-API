const GlassTypes = [
  'HIGH_BALL',
  'LOW_BALL',
  'MARGARITA',
  'MARTINI',
  'COUP'
] as const;

export type GlassType = typeof GlassTypes[number];