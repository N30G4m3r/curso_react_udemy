import type { UnitsByCategory, ConversionRequest, ConversionResponse } from '../types/converter';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Obtiene el listado de unidades agrupadas por categoría
 */
export const fetchUnits = async (): Promise<UnitsByCategory> => {
  const response = await fetch(`${API_BASE_URL}/units`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener las unidades del servidor.');
  }
  return response.json();
};

/**
 * Envía los datos para realizar el cálculo de conversión
 */
export const convertUnitsApi = async (
  data: ConversionRequest
): Promise<ConversionResponse> => {
  const response = await fetch(`${API_BASE_URL}/convert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Error al procesar la conversión.');
  }

  return result;
};