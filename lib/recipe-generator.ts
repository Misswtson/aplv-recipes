import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateAplvRecipes(ingredients: string[]): Promise<string> {
  const ingredientList = ingredients.join(', ');

  const message = await groq.messages.create({
    model: 'mixtral-8x7b-32768',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a nutritionist expert in APLV (Alergia a Proteína de Leche de Vaca - Cow's Milk Protein Allergy) for Chilean children.

A mother has these ingredients at home: ${ingredientList}

Generate 2-3 simple, safe recipes for a 3-year-old with severe APLV. 

IMPORTANT RULES:
- NO dairy products whatsoever (no milk, cheese, butter, yogurt, cream)
- NO processed foods with hidden milk proteins
- Only use the ingredients provided
- Include cooking time (5-15 minutes for busy moms)
- Use simple Spanish instructions

Format each recipe like this:
---
📖 RECETA: [Recipe Name]
⏱️ TIEMPO: [X minutos]
🥘 INGREDIENTES: [List]
👩‍🍳 PREPARACIÓN: [Simple steps in Spanish]
✅ SEGURIDAD APLV: 100% Seguro
---

Respond ONLY with the recipes, no extra text.`,
      },
    ],
  });

  const textContent = message.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Groq');
  }

  return textContent.text;
}