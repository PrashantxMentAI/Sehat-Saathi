import { Siren, TriangleAlert, ShieldAlert } from "lucide-react";
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
   {
    id: 4,
    title: "Heatwave Advisory",
    area: "All Regions",
    description: "Temperatures are expected to be higher than usual. Stay hydrated and avoid outdoor activities during peak hours.",
    severity: "Low",
  },
];

const severityConfig = {
  High: {
    icon: Siren,
    color: "bg-alert-high-bg text-alert-high-fg",
    badge: "destructive",
    animation: "pulse-anim",
    iconColor: "text-alert-high-fg"
  },
  Medium: {
    icon: TriangleAlert,
    color: "bg-alert-medium-bg text-alert-medium-fg",
    badge: "secondary",
    animation: "",
    iconColor: "text-alert-medium-fg"
  },
  Low: {
    icon: ShieldAlert,
    color: "bg-alert-low-bg text-alert-low-fg",
    badge: "default",
    animation: "",
    iconColor: "text-alert-low-fg"
  },
} as const;

export function HealthAlerts() {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Siren className="text-destructive" />
          Real-Time Health Alerts
        </CardTitle>
        <CardDescription className="text-base">
          Stay informed about health advisories and outbreaks in your area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity as keyof typeof severityConfig];
            const Icon = config.icon;
            return (
              <div key={alert.id} className={`p-4 rounded-lg flex flex-col gap-4 ${config.color} shadow-md`}>
                <div className="flex items-center gap-3">
                   <Icon className={`h-8 w-8 flex-shrink-0 ${config.animation} ${config.iconColor}`} />
                   <div className="flex-grow">
                     <h4 className="font-bold text-lg">{alert.title}</h4>
                     <p className="text-sm opacity-80">
                      <strong>Area:</strong> {alert.area}
                    </p>
                   </div>
                   <Badge variant={config.badge}>{alert.severity}</Badge>
                </div>
                <p className="text-sm">{alert.description}</p>
                 <p className="text-xs italic opacity-70 mt-2">Tip: Wash your hands frequently to prevent the spread of germs.</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
