"use client";

import { ShieldCheck, HandHeart, Apple, Bike } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";

export function PreventiveCare() {
  const { t } = useLanguage();
  const careTips = [
    {
      id: "hand-hygiene",
      title: t.preventive_hygiene_title,
      icon: HandHeart,
      content: t.preventive_hygiene_content,
      image: "https://images.unsplash.com/photo-1628235172251-6b87dab144b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxHb29kJTIwaHlnaWVuZSUyMC0lMjBhJTIwZ3JlYXQlMjBoYWJpdCUyMHN0b2NrJTIwcGhvdG8lMjBXYXNoaW5nJTIwSGFuZHMlMkMlMjBIeWdpZW5lJTJDJTIwU29hcCUyMFN1ZCUyQyUyMENsZWFuaW5nJTJDJTIwUGVvcGxlfGVufDB8fHx8MTc1NzA5NTQyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      hint: "hands washing",
      tip: t.preventive_hygiene_tip
    },
    {
      id: "healthy-diet",
      title: t.preventive_diet_title,
      icon: Apple,
      content: t.preventive_diet_content,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEaWV0fGVufDB8fHx8MTc1NzA5NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      hint: "healthy meal",
      tip: t.preventive_diet_tip
    },
    {
      id: "stay-active",
      title: t.preventive_activity_title,
      icon: Bike,
      content: t.preventive_activity_content,
      image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxydW5uaW5nfGVufDB8fHx8MTc1NzA5NTk5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      hint: "person jogging",
      tip: t.preventive_activity_tip
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="text-primary" />
          {t.preventive_title}
        </CardTitle>
        <CardDescription className="text-base">
          {t.preventive_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-8">
          {careTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
               <Image src={tip.image} alt={tip.title} width={300} height={200} className="w-full h-40 object-cover" data-ai-hint={tip.hint} />
               <div className="p-4">
                  <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                    <tip.icon className="h-6 w-6 text-primary" />
                    <span>{tip.title}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{tip.content}</p>
                   <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{t.read_more}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm italic text-primary">{tip.tip}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
               </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
