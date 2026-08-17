import type { ConversionResponse } from '../../types/converter';

interface ResultDisplayProps {
  result: ConversionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay = ({
  result,
  isLoading,
  error,
}: ResultDisplayProps) => {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
        <p className="font-semibold">Error al convertir</p>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-6 p-6 bg-gray-50 border border-gray-100 rounded-xl animate-pulse text-center text-gray-500">
        Calculando conversión...
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
      <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
        Resultado
      </span>
      <div className="mt-2 text-3xl font-bold text-gray-900">
        {result.originalValue}{' '}
        <span className="text-xl font-normal text-gray-600 capitalize">
          {result.from}
        </span>{' '}
        = {result.result}{' '}
        <span className="text-xl font-normal text-gray-600 capitalize">
          {result.to}
        </span>
      </div>
    </div>
  );
};