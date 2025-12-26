
'use server';

/**
 * @fileOverview An AI agent that suggests a small, daily habit for wellness.
 *
 * - suggestHabit - A function that suggests a habit based on user data.
 * - HabitSuggesterInput - The input type for the suggestHabit function.
 * - HabitSuggesterOutput - The return type for the suggestHabit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const HabitSuggesterInputSchema = z.object({
  sleepHours: z.number().describe('The number of hours the user slept.'),
  steps: z.number().describe('The number of steps the user took.'),
  mood: z.string().describe('The user\'s reported mood (e.g., Happy, Tired, Stressed).'),
});
export type HabitSuggesterInput = z.infer<typeof HabitSuggesterInputSchema>;

export const HabitSuggesterOutputSchema = z.object({
  suggestion: z.string().describe('A small habit suggestion for tomorrow formatted as: Habit → Explanation → Motivation quote.'),
});
export type HabitSuggesterOutput = z.infer<typeof HabitSuggesterOutputSchema>;

export async function suggestHabit(
  input: HabitSuggesterInput
): Promise<HabitSuggesterOutput> {
  // return habitSuggesterFlow(input);
  // TEMPORARY FIX: Return a placeholder to avoid crashing from API key permissions.
  return {
    suggestion: "AI Model Not Available → Please check your Google Cloud project settings to enable this feature. → The journey to a working app begins with a single configuration step."
  };
}

const prompt = ai.definePrompt({
  name: 'habitSuggesterPrompt',
  model: 'gemini-1.5-flash-latest',
  input: { schema: HabitSuggesterInputSchema },
  output: { schema: HabitSuggesterOutputSchema },
  prompt: `You are ZenGuru, a calm mindfulness mentor.
Based on the user's data from today, suggest one small, achievable habit for tomorrow that can improve their wellness.
Keep the suggestion simple and positive.

User Data:
- Slept for {{sleepHours}} hours
- Walked for {{steps}} steps
- Mood: {{mood}}

Your response MUST be in the following format, with "→" as the separator:
Habit → Explanation → Motivation quote.

Example for low sleep:
Mindful Morning Stretch → Gently wake your body with a 5-minute stretch before checking your phone. → A single, gentle stretch can awaken a thousand possibilities.

Example for low steps:
A Short Walk After Lunch → Just a 10-minute walk can aid digestion and clear your mind for the afternoon. → The journey of a thousand miles begins with a single step.

Example for stressed mood:
Three Deep Breaths → Whenever you feel overwhelmed, pause and take three slow, deep breaths. → With each breath, you create a space of calm within.
`,
});

const habitSuggesterFlow = ai.defineFlow(
  {
    name: 'habitSuggesterFlow',
    inputSchema: HabitSuggesterInputSchema,
    outputSchema: HabitSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
