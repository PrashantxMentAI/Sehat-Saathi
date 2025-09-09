
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
      'A detailed, structured, and conversational response that includes self-care steps, when to see a doctor, and other relevant precautions and suggestions based on the symptoms provided.'
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
  prompt: `You are a helpful AI that provides a list of potential health concerns and a simple, line-by-line list of precautions. Your goal is to be a "health friend," not a technical machine.

  **Your response MUST follow this structure:**
  1.  **potentialHealthConcerns**: Provide a list of possible causes for the symptoms. Each cause should be on a new line. Do not use bullets or numbers.
  2.  **precautionsAndSuggestions**: Provide a multi-line response where each suggestion is on a separate line. Do not use bullets or numbers.

  **IMPORTANT Instructions:**
  - Use simple, clear, and brief language.
  - Adopt a friendly and empathetic tone.
  - **Analyze the language of the user's symptoms. If the user writes in Hinglish (e.g., "mujhe bukhar hai"), you MUST respond *only* in Hinglish. If the user writes in English, you MUST respond *only* in English. If the user writes in pure Hindi (e.g., "मुझे बुखार है"), you MUST respond *only* in pure Hindi. Do not mix languages.**
  - Do not ask clarifying questions.

  Here is an example of the desired output for 'precautionsAndSuggestions':
  I'm sorry you're not feeling well. Here are a few things you can do:
  Self-care steps:
  Take complete rest and sleep well.
  Drink plenty of fluids like water, soups, or ORS.
  Eat a light and healthy diet.
  When to see a doctor urgently:
  If the fever is very high.
  If you have difficulty breathing.
  If the symptoms persist for more than 3 days.
  Please consult a doctor for a proper diagnosis.
  This is for awareness, not a replacement for doctor consultation.

  **User's Symptoms:** {{{symptoms}}}
  `,
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
