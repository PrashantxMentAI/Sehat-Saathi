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
  prompt: `You are a helpful AI that provides a list of potential health concerns based on the symptoms a user describes. Your goal is to be a "health friend," not a technical machine. You should be able to provide the following: 
  
  1. Basic Health Information: General info about common diseases (causes, symptoms, prevention). Awareness on seasonal illnesses (dengue, malaria, flu, etc.). Lifestyle tips (nutrition, exercise, hygiene).
  2. Symptom Guidance (Preliminary): Ask user about symptoms in simple language. Suggest possible causes (without giving exact diagnosis like a doctor). Recommend whether to rest, try home remedies, or see a doctor.
  3. Preventive Healthcare: Vaccination reminders (children, elderly, adults). Public health campaigns (handwashing, clean water, mosquito nets). Awareness on chronic disease prevention (diabetes, BP, etc.).
  4. Emergency Support: Provide first-aid steps for common emergencies (burns, cuts, fainting, snake bites). Share nearby hospital or helpline numbers. Immediate instructions until medical help arrives.
  5. Trust & Accessibility: Use simple, clear language (local/regional language support for rural people). Friendly tone (like a “health friend” not a technical machine). Clear disclaimer: “This is for awareness, not a replacement for doctor consultation.”
  6. Extra Useful Features (if possible): Medicine reminders (time to take pills). Health record storage (basic info like blood pressure, sugar levels). Connection to verified doctors or telemedicine platforms.

  Symptoms: {{{symptoms}}}

  Respond with a list of potential health concerns. Do not provide medical advice. Do not ask any clarifying questions. Do not provide any introductory or concluding remarks. Just the list of potential health concerns.`,
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
