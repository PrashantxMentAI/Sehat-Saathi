"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const faqs = [
  {
    id: "q1",
    question: "What should I do if my symptoms are severe?",
    answer: "If you are experiencing severe symptoms such as difficulty breathing, chest pain, or loss of consciousness, please seek immediate medical attention by calling your local emergency number or visiting the nearest hospital. This tool is for informational purposes only and not a substitute for professional medical advice.",
  },
  {
    id: "q2",
    question: "How accurate is the symptom checker?",
    answer: "The symptom checker is an AI-powered tool designed to provide potential health concerns based on the symptoms you provide. <strong class='text-primary'>It is not a diagnostic tool and should not be used as a substitute for a consultation with a qualified healthcare professional.</strong> The accuracy depends on the information you provide and the underlying data.",
  },
  {
    id: "q3",
    question: "Is my data private?",
    answer: "We take your privacy seriously. The information you provide is used to give you health information and is not shared with third parties without your consent. Please review our privacy policy for more details.",
  },
];

export function Faq() {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <HelpCircle className="text-primary" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger className="text-left font-semibold text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
