import { useState, useEffect } from 'react';
import { fetchUnits, convertUnitsApi } from '../services/api';
import type { Category, UnitsByCategory, ConversionResponse } from '../types/converter';

export const useConverter = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('length');
  const [unitsByCategory, setUnitsByCategory] = useState<UnitsByCategory | null>(null);
  const [conversionResult, setConversionResult] = useState<ConversionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar las unidades al inicializar la aplicación
  useEffect(() => {
    const loadUnits = async () => {
      try {
        setError(null);
        const data = await fetchUnits();
        setUnitsByCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al conectar con el servidor.');
      }
    };

    loadUnits();
  }, []);

  // Función para realizar la conversión
  const performConversion = async (value: number, from: string, to: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await convertUnitsApi({
        category: activeCategory,
        value,
        from,
        to,
      });
      setConversionResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar la conversión.');
      setConversionResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Cambiar categoría limpia el resultado previo
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setConversionResult(null);
    setError(null);
  };

  return {
    activeCategory,
    units: unitsByCategory ? unitsByCategory[activeCategory] || [] : [],
    conversionResult,
    isLoading,
    error,
    changeCategory: handleCategoryChange,
    convert: performConversion,
  };
};