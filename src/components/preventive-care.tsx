import { ShieldCheck, HandHeart, Apple, Bike } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';

const careTips = [
  {
    id: "hand-hygiene",
    title: "Practice Good Hand Hygiene",
    icon: HandHeart,
    content: "Wash your hands frequently with soap and water for at least 20 seconds, especially after being in public places, or after blowing your nose, coughing, or sneezing. If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol.",
    image: "https://images.unsplash.com/photo-1628235172251-6b87dab144b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxHb29kJTIwaHlnaWVuZSUyMC0lMjBhJTIwZ3JlYXQlMjBoYWJpdCUyMHN0b2NrJTIwcGhvdG8lMjBXYXNoaW5nJTIwSGFuZHMlMkMlMjBIeWdpZW5lJTJDJTIwU29hcCUyMFN1ZCUyQyUyMENsZWFuaW5nJTJDJTIwUGVvcGxlfGVufDB8fHx8MTc1NzA5NTQyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "hands washing",
    tip: "A simple hand wash can prevent a majority of infections."
  },
  {
    id: "healthy-diet",
    title: "Maintain a Healthy Diet",
    icon: Apple,
    content: "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. A healthy diet helps boost your immune system and provides the energy you need to stay active and fight off infections.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEaWV0fGVufDB8fHx8MTc1NzA5NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "healthy meal",
    tip: "Eating colorful fruits and vegetables ensures you get a wide range of nutrients."
  },
  {
    id: "stay-active",
    title: "Stay Physically Active",
    icon: Bike,
    content: "Engage in regular physical activity. Aim for at least 30 minutes of moderate-intensity exercise most days of the week. Exercise can help improve your overall health and well-being, and strengthen your immune system.",
    image: "https://picsum.photos/300/202",
    hint: "person jogging",
    tip: "Even a brisk 30-minute walk daily can make a huge difference."
  },
];

export function PreventiveCare() {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="text-primary" />
          Preventive Care Information
        </CardTitle>
        <CardDescription className="text-base">
          Simple steps you can take to protect your health and prevent diseases.
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
                      <AccordionTrigger>Read More</AccordionTrigger>
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
