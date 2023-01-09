const DrinkColors = [
  'RED',
  'GREEN',
  'YELLOW',
  'BLUE',
  'ORANGE',
  'BROWN',
  'WHITE',
  'PINK',
  'PURPLE',
  'BLACK'
] as const;

export type DrinkColor = typeof DrinkColors[number];