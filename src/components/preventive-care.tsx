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
    image: "https://storage.googleapis.com/maker-studio-project-416112/user/e8c89b4c-9f82-4f47-8a90-34907954e718/generations/c1995255-a9a3-485e-a6a1-9a7c646c263c.jpeg",
    hint: "A realistic photo of a young child (around 6–10 years old) washing hands with soap and water at a sink. The setting should look bright, clean, and hygienic, with water running from the tap. The child should appear happy and healthy, showing good handwashing practice. The photo should promote hygiene awareness, with natural lighting and a positive, educational atmosphere.",
    tip: "A simple hand wash can prevent a majority of infections."
  },
  {
    id: "healthy-diet",
    title: "Maintain a Healthy Diet",
    icon: Apple,
    content: "Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. A healthy diet helps boost your immune system and provides the energy you need to stay active and fight off infections.",
    image: "https://storage.googleapis.com/maker-studio-project-416112/user/e8c89b4c-9f82-4f47-8a90-34907954e718/generations/c516f467-3392-4881-8318-a664e4889c8a.jpeg",
    hint: "A vibrant, high-angle, realistic photo of a colorful and balanced meal spread on a light wooden table. The meal should include a variety of fresh fruits (like berries or apples), vegetables (like leafy greens or bell peppers), lean protein (like grilled chicken or fish), and whole grains (like quinoa or brown rice). The lighting should be natural and inviting, making the food look appealing and healthy.",
    tip: "Eating colorful fruits and vegetables ensures you get a wide range of nutrients."
  },
  {
    id: "stay-active",
    title: "Stay Physically Active",
    icon: Bike,
    content: "Engage in regular physical activity. Aim for at least 30 minutes of moderate-intensity exercise most days of the week. Exercise can help improve your overall health and well-being, and strengthen your immune system.",
    image: "https://picsum.photos/300/202",
    hint: "A dynamic, realistic photo of a person engaged in moderate physical activity outdoors. This could be someone jogging on a scenic path, stretching in a park, or cycling with a joyful expression. The setting should be natural and inspiring, with good lighting that conveys energy and well-being. The focus should be on promoting general physical activity, not extreme sports.",
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
