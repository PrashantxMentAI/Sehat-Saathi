
'use server';

/**
 * @fileOverview A gamification AI agent to generate rewarding messages.
 *
 * - generateGamificationMessage - A function that creates a game-like message.
 * - GamificationInput - The input type for the function.
 * - GamificationOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GamificationInputSchema = z.object({
  healthPoints: z.number().describe('The current health points of the user.'),
});
export type GamificationInput = z.infer<typeof GamificationInputSchema>;

const GamificationOutputSchema = z.object({
  gamificationMessage: z
    .string()
    .describe('A short, calming, and mindful message describing a new level or reward.'),
});
export type GamificationOutput = z.infer<typeof GamificationOutputSchema>;

export async function generateGamificationMessage(
  input: GamificationInput
): Promise<GamificationOutput> {
  return gamificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gamificationPrompt',
  model: 'gemini-1.5-flash-latest',
  input: { schema: GamificationInputSchema },
  output: { schema: GamificationOutputSchema },
  prompt: `You are ZenGuru, a calm mindfulness mentor. Use a gentle and encouraging tone.
User's wellness points: {{healthPoints}}
Generate a short, calming message acknowledging their progress. Include their new "inner harmony" level and a small mindfulness tip or a fictional serene reward.
The level should be calculated as (healthPoints / 100) + 1.
Example: "Breathe in, breathe out. You've reached Inner Harmony Level 2. You've earned the 'Mindful Moment' badge. Take a second to close your eyes and just be."
Another Example: "With 150 points, your spirit is calm. You've unlocked the 'Tranquil Soul' aura. Remember to find stillness in your day."
`,
});

const gamificationFlow = ai.defineFlow(
  {
    name: 'gamificationFlow',
    inputSchema: GamificationInputSchema,
    outputSchema: GamificationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
