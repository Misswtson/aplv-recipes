'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchFormProps {
  onSearch: (ingredients: string[]) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = () => {
    if (input.trim() && !ingredients.includes(input.trim().toLowerCase())) {
      const newIngredients = [...ingredients, input.trim().toLowerCase()];
      setIngredients(newIngredients);
      setInput('');
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey || e.metaKey) {
        handleSearch();
      } else {
        addIngredient();
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ej: Pollo, arroz, zanahoria..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
        />
        <button
          onClick={addIngredient}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
        >
          Agregar
        </button>
      </div>

      {/* Ingredients chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing) => (
            <div
              key={ing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-full animate-slideIn"
            >
              <span className="text-sm font-medium text-orange-700 capitalize">{ing}</span>
              <button
                onClick={() => removeIngredient(ing)}
                className="text-orange-600 hover:text-orange-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main CTA */}
      <button
        onClick={handleSearch}
        disabled={ingredients.length === 0 || isLoading}
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        <Search size={20} />
        <span>{isLoading ? 'Generando recetas...' : 'Generar Recetas'}</span>
      </button>

      <p className="text-center text-xs text-gray-500">
        💡 Consejo: Agrega 2-4 ingredientes para mejores resultados
      </p>
    </div>
  );
}