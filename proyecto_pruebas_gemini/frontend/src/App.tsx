import { CategoryTabs } from './components/converter/CategoryTabs';
import { ConverterForm } from './components/converter/ConverterForm';
import { ResultDisplay } from './components/converter/ResultDisplay';
import { useConverter } from './hooks/useConverter';

export function App() {
  const {
    activeCategory,
    units,
    conversionResult,
    isLoading,
    error,
    changeCategory,
    convert,
  } = useConverter();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Conversor de Unidades
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Selecciona la categoría, ingresa un valor y realiza la conversión al instante.
          </p>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={changeCategory}
          />

          <ConverterForm
            category={activeCategory}
            units={units}
            onSubmit={convert}
            isLoading={isLoading}
          />

          <ResultDisplay
            result={conversionResult}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
