
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
  precautionsAndSuggestions: z
    .string()
    .describe(
      'A list of precautions and suggestions based on the symptoms provided.'
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
  prompt: `You are a helpful AI that provides a list of potential health concerns and precautions based on the symptoms a user describes. Your goal is to be a "health friend," not a technical machine. You should be able to provide the following: 
  
  1. Basic Health Information: General info about common diseases (causes, symptoms, prevention). Awareness on seasonal illnesses (dengue, malaria, flu, etc.). Lifestyle tips (nutrition, exercise, hygiene).
  2. Symptom Guidance (Preliminary): Suggest possible causes (without giving exact diagnosis like a doctor). Recommend whether to rest, try home remedies, or see a doctor. This goes in 'potentialHealthConcerns'.
  3. Precautionary and Suggestive Advice: Based on the symptoms, provide a list of precautions and suggestions. This goes in 'precautionsAndSuggestions'.
  4. Trust & Accessibility: Use simple, clear language (local/regional language support for rural people). Friendly tone (like a “health friend” not a technical machine). Clear disclaimer: “This is for awareness, not a replacement for doctor consultation.”

  IMPORTANT: Analyze the language of the user's symptoms. If the user writes in Hinglish (e.g., "mujhe bukhar hai"), you MUST respond in Hinglish. If the user writes in English, respond in English. If the user writes in Hindi, respond in Hindi. Match the user's language.

  Symptoms: {{{symptoms}}}

  Respond with a list of potential health concerns and a list of precautions/suggestions. Do not provide medical advice. Do not ask any clarifying questions. Do not provide any introductory or concluding remarks. Just the lists.`,
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

