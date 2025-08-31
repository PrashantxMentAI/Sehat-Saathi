import { ShieldCheck, HandHeart, Apple, Bike } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const careTips = [
  {
    id: "hand-hygiene",
    title: "Practice Good Hand Hygiene",
    icon: HandHeart,
    content: "Wash your hands frequently with soap and water for at least 20 seconds, especially after being in public places, or after blowing your nose, coughing, or sneezing. If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol.",
  },
  {
    id: "healthy-diet",
    title: "Maintain a Healthy Diet",
    icon: Apple,
    content: "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. A healthy diet helps boost your immune system and provides the energy you need to stay active and fight off infections.",
  },
  {
    id: "stay-active",
    title: "Stay Physically Active",
    icon: Bike,
    content: "Engage in regular physical activity. Aim for at least 30 minutes of moderate-intensity exercise most days of the week. Exercise can help improve your overall health and well-being, and strengthen your immune system.",
  },
];

export function PreventiveCare() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Preventive Care Information
        </CardTitle>
        <CardDescription>
          Simple steps you can take to protect your health and prevent diseases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {careTips.map((tip) => (
            <AccordionItem value={tip.id} key={tip.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <tip.icon className="h-5 w-5 text-primary" />
                  <span>{tip.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                {tip.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
