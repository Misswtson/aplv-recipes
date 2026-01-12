import { NextRequest, NextResponse } from 'next/server';
import { generateAplvRecipes } from '@/lib/recipe-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients } = body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      );
    }

    const recipes = await generateAplvRecipes(ingredients);

    return NextResponse.json({
      success: true,
      recipes,
      ingredientsUsed: ingredients,
    });
  } catch (error) {
    console.error('Recipe generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipes' },
      { status: 500 }
    );
  }
}