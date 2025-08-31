import { Siren } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    title: "Flu Season Peak",
    area: "National",
    description: "An increase in influenza cases has been reported nationwide. Ensure you are vaccinated.",
    severity: "High",
  },
  {
    id: 2,
    title: "Dengue Outbreak",
    area: "Semi-Urban Regions",
    description: "Mosquito-borne dengue fever cases are on the rise. Eliminate stagnant water sources.",
    severity: "Medium",
  },
  {
    id: 3,
    title: "Measles Cluster",
    area: "Rural District X",
    description: "A small cluster of measles has been identified. Check vaccination status for children.",
    severity: "High",
  },
];

export function HealthAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Siren className="text-destructive" />
          Real-Time Health Alerts
        </CardTitle>
        <CardDescription>
          Stay informed about health advisories and outbreaks in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-start gap-4">
              <Siren className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-semibold">{alert.title}</h4>
                  <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Area:</strong> {alert.area}
                </p>
                <p className="text-sm">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
