"use client";

import { Syringe, Baby, Lollipop, PersonStanding } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export function VaccinationSchedule() {
  const { t } = useLanguage();

  const schedule = [
    {
      stage: t.vaccine_stage_birth,
      icon: Baby,
      vaccines: t.vaccine_stage_birth_vaccines,
    },
    {
      stage: t.vaccine_stage_weeks,
      icon: Baby,
      vaccines: t.vaccine_stage_weeks_vaccines,
    },
    {
      stage: t.vaccine_stage_months,
      icon: Lollipop,
      vaccines: t.vaccine_stage_months_vaccines,
    },
    {
      stage: t.vaccine_stage_adults,
      icon: PersonStanding,
      vaccines: t.vaccine_stage_adults_vaccines,
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Syringe className="text-primary" />
          {t.vaccine_title}
        </CardTitle>
        <CardDescription className="text-base">
          {t.vaccine_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          {schedule.map((item, index) => (
            <div key={index} className="relative flex items-center gap-4">
              <p className="w-24 shrink-0 text-right font-bold text-lg text-primary">{item.stage}</p>
              <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <h4 className="font-semibold mb-2">{t.vaccine_recommended}:</h4>
                 <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {item.vaccines.map((vaccine, vIndex) => (
                      <li key={vIndex}>{vaccine}</li>
                    ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
