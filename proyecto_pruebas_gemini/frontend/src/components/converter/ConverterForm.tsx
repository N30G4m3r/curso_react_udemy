import { useState, useEffect, type SubmitEvent } from 'react';
import type { Category } from '../../types/converter';

interface ConverterFormProps {
  category: Category;
  units: string[];
  onSubmit: (value: number, from: string, to: string) => void;
  isLoading?: boolean;
}

export const ConverterForm = ({
  category,
  units,
  onSubmit,
  isLoading = false,
}: ConverterFormProps) => {
  // Estado local para los campos del formulario
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');

  // Sincronizar unidades por defecto al cambiar de categoría o cargar la lista
  useEffect(() => {
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
    }
  }, [category, units]);

  // Manejador del envío del formulario
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault(); // Evita recargar la página (comportamiento por defecto del submit HTML)
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) && fromUnit && toUnit) {
      onSubmit(numericValue, fromUnit, toUnit);
    }
  };

  // Intercambiar unidad origen y destino
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Campo para ingresar el valor */}
      <div className="flex flex-col gap-1">
        <label htmlFor="value-input" className="text-sm font-medium text-gray-700">
          Valor a convertir
        </label>
        <input
          id="value-input"
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ej: 10"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>

      {/* Selectores de unidades y botón de intercambio */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="from-unit" className="text-sm font-medium text-gray-700">
            Desde
          </label>
          <select
            id="from-unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 capitalize"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Botón para intercambiar unidades rápidamente */}
        <button
          type="button"
          onClick={handleSwap}
          title="Intercambiar unidades"
          className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors flex items-center justify-center"
        >
          ⇄
        </button>

        <div className="flex flex-col gap-1">
          <label htmlFor="to-unit" className="text-sm font-medium text-gray-700">
            Hacia
          </label>
          <select
            id="to-unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 capitalize"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg shadow-sm transition-colors mt-2"
      >
        {isLoading ? 'Convertiendo...' : 'Convertir'}
      </button>
    </form>
  );
};