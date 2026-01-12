'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const ingredientList = ingredients
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean);

      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientList }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipes(data.recipes);
      } else {
        setRecipes(`Error: ${data.error}`);
      }
    } catch (error) {
      setRecipes(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section - Warm & Welcoming */}
        <div className="text-center mb-12 md:mb-20">
          <div className="mb-8 inline-block">
            <div className="text-7xl animate-bounce">👩‍🍳</div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-rose-800 to-pink-900">
            Ayuda APLV
          </h1>
          
          <p className="text-xl md:text-2xl text-rose-900/70 mb-3 font-medium">
            Recetas seguras para tu bebé 💕
          </p>
          
          <p className="text-lg text-amber-800/60 max-w-2xl mx-auto leading-relaxed">
            Generadas por IA · 100% Seguras para APLV · Rápidas y fáciles de preparar
          </p>
        </div>

        {/* Ingredients Input Card - Cozy Design */}
        <Card className="border-0 shadow-2xl mb-12 overflow-hidden bg-white/95">
          <div className="h-2 bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300"></div>
          
          <CardHeader className="pb-4 bg-gradient-to-br from-orange-50 to-rose-50">
            <CardTitle className="text-2xl md:text-3xl font-bold text-amber-900 flex items-center gap-3 mb-3">
              <ChefHat className="w-8 h-8 text-rose-500" />
              ¿Qué ingredientes tienes?
            </CardTitle>
            <CardDescription className="text-amber-700 text-base">
              Cuéntanos lo que tienes en tu cocina y te sugeriremos recetas deliciosas y seguras
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Ej: Pollo, Arroz blanco, Zanahoria, Aceite de oliva..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="flex-1 h-14 md:h-16 text-base md:text-lg rounded-2xl border-2 border-rose-200 focus:border-rose-400 placeholder-rose-300/70 bg-rose-50/50"
                disabled={loading}
              />
              <Button 
                onClick={handleGenerate}
                disabled={loading || !ingredients.trim()}
                size="lg"
                className="md:px-10 h-14 md:h-16 font-bold text-lg rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Generar Recetas
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-sm text-amber-700/60 mt-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              Recetas pensadas con amor para tu pequeño
            </p>
          </CardContent>
        </Card>

        {/* Results Card - Warm & Celebratory */}
        {recipes && (
          <Card className="border-0 shadow-2xl overflow-hidden bg-white/95">
            <div className="h-2 bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300"></div>
            
            <CardHeader className="pb-4 bg-gradient-to-br from-emerald-50 to-green-50">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-base px-4 py-2 rounded-full">
                  ✅ 100% Seguro APLV
                </Badge>
                <span className="text-emerald-600 font-bold">¡Listo para disfrutar!</span>
              </div>
              <CardTitle className="text-3xl font-bold text-emerald-900">
                Tus Recetas Personalizadas 🍽️
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8 md:p-10 rounded-b-3xl">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-emerald-200/50">
                  <pre className="whitespace-pre-wrap text-base font-medium text-emerald-900 leading-relaxed font-sans">
                    {recipes}
                  </pre>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl border-2 border-amber-200">
                  <p className="text-amber-900 font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Consejo: Prueba con pequeñas porciones primero
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-amber-700/60">
          <p className="text-sm">
            Hecho con ❤️ para las mamás de Chile · APLV Seguro
          </p>
        </div>
      </div>
    </main>
  );
}