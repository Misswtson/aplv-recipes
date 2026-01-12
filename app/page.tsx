'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg mb-6">
            <ChefHat className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
              Ayuda APLV
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-md mx-auto">
            Recetas seguras generadas por IA para niños con Alergia a Proteína de Leche de Vaca
          </p>
        </div>

        {/* Input Card */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-7 h-7 text-blue-600" />
              Ingredientes que tienes en casa
            </CardTitle>
            <CardDescription>
              Separa con comas. Ej: Pollo, Arroz blanco, Zanahoria, Aceite de oliva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Pollo, Arroz, Zanahoria..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="flex-1 h-14 text-lg"
                disabled={loading}
              />
              <Button 
                onClick={handleGenerate}
                disabled={loading || !ingredients.trim()}
                size="lg"
                className="px-10 h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <ChefHat className="w-5 h-5 mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Generar Recetas
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {recipes && (
          <Card className="mt-12 border-0 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  ✅ 100% Seguro APLV
                </Badge>
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Tus Recetas Personalizadas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-2xl border-4 border-green-100">
                <pre className="whitespace-pre-wrap text-base font-medium text-slate-900 leading-relaxed">
                  {recipes}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}