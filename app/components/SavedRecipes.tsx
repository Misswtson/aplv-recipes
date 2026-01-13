'use client';
import { Trash2, ArrowLeft } from 'lucide-react';

interface SavedRecipesProps {
  recipes: any[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function SavedRecipes({ recipes, onDelete, onBack }: SavedRecipesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          ❤️ Mis Recetas Guardadas ({recipes.length})
        </h2>
      </div>

      {recipes.length === 0 ? (
        <div className="py-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 text-lg font-medium">No tienes recetas guardadas</p>
          <p className="text-gray-500 text-sm mt-1">¡Genera algunas y guarda tus favoritas!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => {
            // Handle ingredientes - can be string or array
            const ingredientsList = 
              recipe.ingredientes && typeof recipe.ingredientes === 'string'
                ? recipe.ingredientes.split(',')
                : Array.isArray(recipe.ingredientes)
                ? recipe.ingredientes
                : [];

            return (
              <div
                key={recipe.id}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{recipe.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recipe.preparacion}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ingredientsList.slice(0, 3).map((ing: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                        >
                          {typeof ing === 'string' ? ing.trim() : ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(recipe.id)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar receta"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
