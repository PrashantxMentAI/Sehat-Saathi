import { Syringe, Baby, Lollipop, PersonStanding, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const schedule = [
  {
    stage: "At Birth",
    icon: Baby,
    vaccines: ["BCG (Tuberculosis)", "Hepatitis B", "Polio (OPV)"],
  },
  {
    stage: "6-14 Weeks",
    icon: Baby,
    vaccines: ["Polio (OPV)", "Pentavalent (DTP, Hib, Hep B)"],
  },
  {
    stage: "9-12 Months",
    icon: Lollipop,
    vaccines: ["Measles, Mumps, Rubella (MMR)"],
  },
  {
    stage: "Teenagers & Adults",
    icon: PersonStanding,
    vaccines: ["Tetanus and Diphtheria (Td)"],
  },
];

export function VaccinationSchedule() {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Syringe className="text-primary" />
          Vaccination Timeline
        </CardTitle>
        <CardDescription className="text-base">
          A general vaccination schedule. Always consult a doctor for a personalized plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8">
          {/* Vertical timeline line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-10">
            {schedule.map((item, index) => (
              <div key={index} className="relative flex items-start gap-6">
                <div className="absolute left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background p-1 rounded-full">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="w-24 text-right pr-6 shrink-0">
                    <p className="font-bold text-lg text-primary">{item.stage}</p>
                </div>
                <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                  <h4 className="font-semibold mb-2">Recommended Vaccines:</h4>
                   <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {item.vaccines.map((vaccine, vIndex) => (
                        <li key={vIndex}>{vaccine}</li>
                      ))}
                   </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
