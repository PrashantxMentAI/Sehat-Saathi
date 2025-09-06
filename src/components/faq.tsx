"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export function Faq() {
  const { t } = useLanguage();

  const faqs = [
    {
      id: "q1",
      question: t.faq_q1,
      answer: t.faq_a1,
    },
    {
      id: "q2",
      question: t.faq_q2,
      answer: t.faq_a2,
    },
    {
      id: "q3",
      question: t.faq_q3,
      answer: t.faq_a3,
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <HelpCircle className="text-primary" />
          {t.faq_title}
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
