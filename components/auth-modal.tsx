'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { X } from 'lucide-react';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="pb-4 bg-gradient-to-br from-rose-50 to-pink-50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-rose-900">
              {isSignUp ? 'Crear Cuenta' : 'Inicia Sesión'}
            </CardTitle>
            <CardDescription>
              {isSignUp ? 'Crea una cuenta para guardar tus recetas' : 'Accede a tus recetas guardadas'}
            </CardDescription>
          </div>
          <button onClick={onClose} className="text-rose-600 hover:text-rose-900">
            <X className="w-6 h-6" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-2 border-rose-200"
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-2 border-rose-200"
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 font-bold"
            >
              {loading ? 'Cargando...' : isSignUp ? 'Crear Cuenta' : 'Inicia Sesión'}
            </Button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-rose-600 text-sm hover:text-rose-900 font-medium"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crea una'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
