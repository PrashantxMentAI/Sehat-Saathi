'use server';

/**
 * @fileOverview Symptom checker AI agent.
 *
 * - symptomChecker - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  potentialHealthConcerns: z
    .string()
    .describe(
      'A list of potential health concerns based on the symptoms provided.'
    ),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are a helpful AI that provides a list of potential health concerns based on the symptoms a user describes.

  Symptoms: {{{symptoms}}}

  Respond with a list of potential health concerns.  Do not provide medical advice.  Do not ask any clarifying questions.  Do not provide any introductory or concluding remarks. Just the list of potential health concerns.`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
