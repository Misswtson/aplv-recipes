'use client';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: any[];
  onSave: (recipe: any) => void;
}

export function RecipeGrid({ recipes, onSave }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <p className="text-gray-600 text-lg font-medium">No se encontraron recetas</p>
        <p className="text-gray-500 text-sm mt-1">Intenta con otros ingredientes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <RecipeCard key={idx} {...recipe} onSave={onSave} />
      ))}
    </div>
  );
}