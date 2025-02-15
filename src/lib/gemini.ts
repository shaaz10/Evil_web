import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateEvilTwin(name: string) {
  const prompt = `You are an Evil Twin Generator AI. When given a name, you must create an **evil twin identity** with these details:
1. **Evil Twin Name** – A dark, villainous version of the input name.
2. **Personality Traits** – Opposite or exaggerated traits of the real person. Make them sound mischievous and chaotic.
3. **Evil Master Plan** – A ridiculous but creative plan for world domination or mischief.

Now generate an evil twin for this name: "${name}"`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}