import type { Category } from '../../types/converter';

interface CategoryTabsProps {
    activeCategory: Category;
    onSelectCategory: (category: Category) => void;
}

// // Configuración de las pestañas disponibles
// const CATEGORIES: { id: Category; label: string }[] = [
//     { id: 'length', label: 'Longitud' },
//     { id: 'weight', label: 'Peso' },
//     { id: 'temperature', label: 'Temperatura' },
// ];

// export const CategoryTabs = ({
//     activeCategory,
//     onSelectCategory,
// }: CategoryTabsProps) => {
//     return (
//         <nav className="flex gap-2 border-b border-gray-200 pb-2 mb-6" aria-label="Categorías de conversión">
//             {CATEGORIES.map((category) => {
//                 const isActive = activeCategory === category.id;

//                 return (
//                     <button
//                         key={category.id}
//                         type="button"
//                         onClick={() => onSelectCategory(category.id)}
//                         className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive
//                             ? 'bg-blue-600 text-white shadow-sm'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
//                             }`}
//                     >
//                         {category.label}
//                     </button>
//                 );
//             })}
//         </nav>
//     );
// };

export function CategoryTabs({
    activeCategory,
    onSelectCategory,
}: CategoryTabsProps) {

    // Configuración de las pestañas disponibles
    const CATEGORIES: { id: Category; label: string }[] = [
        { id: 'length', label: 'Longitud' },
        { id: 'weight', label: 'Peso' },
        { id: 'temperature', label: 'Temperatura' },
    ];

    return (
        <nav className="flex gap-2 border-b border-gray-200 pb-2 mb-6" aria-label="Categorías de conversión">
            {CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onSelectCategory(category.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                    >
                        {category.label}
                    </button>
                );
            })}
        </nav>
    )
}