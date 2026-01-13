'use client';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface RecipeCardProps {
  id?: string;
  nombre: string;
  tiempo: string;
  ingredientes: string[];
  preparacion: string;
  seguridad: string;
  onSave: (recipe: any) => void;
}

export function RecipeCard({ nombre, tiempo, ingredientes, preparacion, seguridad, onSave }: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = async () => {
    onSave({ nombre, tiempo, ingredientes: ingredientes.join(', '), preparacion, seguridad });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center relative overflow-hidden group">
        <div className="text-center p-4 text-gray-700 group-hover:scale-110 transition-transform duration-300">
          <div className="text-5xl">👨‍🍳</div>
          <p className="text-sm font-medium mt-2">{nombre}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Header with badges */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex-1 line-clamp-2">{nombre}</h3>
          <span className="ml-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full whitespace-nowrap">
            ⏱️ {tiempo}
          </span>
        </div>

        {/* Ingredients preview */}
        <div className="mb-4 flex-grow">
          <p className="text-sm font-medium text-gray-700 mb-2">Ingredientes:</p>
          <div className="flex flex-wrap gap-2">
            {ingredientes.slice(0, 3).map((ing, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200 hover:bg-green-100 transition-colors"
              >
                {ing.trim()}
              </span>
            ))}
            {ingredientes.length > 3 && (
              <span className="px-3 py-1 text-gray-600 text-xs font-medium">
                +{ingredientes.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Safety badge */}
        <div className="mb-4 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-700 font-semibold">✅ 100% Seguro APLV</p>
        </div>

        {/* Expandable preparation */}
        {isExpanded && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Preparación:</h4>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{preparacion}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? 'Ocultar' : 'Ver preparación'}
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isSaved
                ? 'bg-green-500 text-white'
                : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200'
            }`}
          >
            <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
            <span className="ml-2">{isSaved ? '¡Guardada!' : 'Guardar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}