export type Category = 'length' | 'weight' | 'temperature';

const lengthRates: Record = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

const weightRates: Record = {
  milligram: 0.001,
  gram: 1,
  kilogram: 1000,
  ounce: 28.349523125,
  pound: 453.59237,
};

export const UNITS_BY_CATEGORY: Record = {
  length: Object.keys(lengthRates),
  weight: Object.keys(weightRates),
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
};

export function convertUnits(
  category: Category,
  value: number,
  from: string,
  to: string
): number {
  if (category === 'temperature') {
    return convertTemperature(value, from, to);
  }

  const rates = category === 'length' ? lengthRates : weightRates;
  if (!rates[from] || !rates[to]) {
    throw new Error(`Unidades no válidas para ${category}`);
  }

  const baseValue = value * rates[from];
  return baseValue / rates[to];
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;

  let celsius = value;
  if (from === 'Fahrenheit') celsius = (value - 32) * (5 / 9);
  else if (from === 'Kelvin') celsius = value - 273.15;

  if (to === 'Fahrenheit') return celsius * (9 / 5) + 32;
  if (to === 'Kelvin') return celsius + 273.15;
  return celsius;
}