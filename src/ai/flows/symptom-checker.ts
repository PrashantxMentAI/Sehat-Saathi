
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
  prompt: `You are a helpful AI that provides a list of potential health concerns and detailed, structured, and conversational precautions based on the symptoms a user describes. Your goal is to be a "health friend," not a technical machine. 

  **Your response MUST follow this structure:**
  1.  **potentialHealthConcerns**: Provide a list of possible causes for the symptoms.
  2.  **precautionsAndSuggestions**: Provide a brief, structured, and conversational response that includes:
      - A friendly opening, like "I'm sorry you're not feeling well. Since you have [symptom], here are a few things you can do:"
      - A "**Self-care steps**" section with a short, bulleted list (using '*') of actionable advice. Each bullet point should be a complete sentence and not contain its own heading (e.g., "* Get plenty of rest to help your body recover.").
      - A "**When to see a doctor urgently**" section with a short, bulleted list (using '*') of serious symptoms that warrant immediate medical attention. Each point should be a complete sentence.
      - A concluding recommendation to visit a doctor for a proper diagnosis.
      - A clear disclaimer: “This is for awareness, not a replacement for doctor consultation.”

  **IMPORTANT Instructions:**
  - Use simple, clear, and brief language. Keep the lists short and to the point.
  - Adopt a friendly and empathetic tone.
  - **Analyze the language of the user's symptoms. If the user writes in Hinglish (e.g., "mujhe bukhar hai"), you MUST respond in Hinglish. If the user writes in English, respond in English. If the user writes in Hindi, respond in Hindi. Match the user's language.**
  - Do not ask clarifying questions.

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
