
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
    .describe('A short, exciting, game-style message describing a new level or reward.'),
});
export type GamificationOutput = z.infer<typeof GamificationOutputSchema>;

export async function generateGamificationMessage(
  input: GamificationInput
): Promise<GamificationOutput> {
  return gamificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gamificationPrompt',
  model: 'gemini-pro',
  input: { schema: GamificationInputSchema },
  output: { schema: GamificationOutputSchema },
  prompt: `User health points: {{healthPoints}}
Generate a short, exciting, game-style message describing their new level and a fictional reward based on their points.
The level should be calculated as (healthPoints / 100) + 1.
Example: "🎉 Level 3 Unlocked — You’ve gained 10 Energy Stars for your consistency!"
Another Example: "Amazing! You've reached 150 points and earned the 'Wellness Warrior' badge! ✨"
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
