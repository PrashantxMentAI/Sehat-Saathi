"use client";

import { Siren, TriangleAlert, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";

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
  const { t } = useLanguage();

  const alerts = [
    {
      id: 1,
      title: t.flu,
      area: t.national,
      description: t.flu_desc,
      severity: "High",
      tip: "Practice good respiratory hygiene (cover coughs/sneezes), and avoid close contact with sick individuals.",
      source: "WHO Influenza Updates",
    },
    {
      id: 2,
      title: t.dengue,
      area: t.semi_urban,
      description: t.dengue_desc,
      severity: "Medium",
      tip: "Use mosquito repellents, wear long sleeves, and eliminate stagnant water around your home to reduce mosquito breeding.",
      source: "Govt. Health Data (IDSP)",
    },
    {
      id: 3,
      title: t.measles,
      area: t.rural_district,
      description: t.measles_desc,
      severity: "High",
      tip: "Ensure children are fully vaccinated with the MMR vaccine and avoid exposure to individuals showing measles symptoms.",
      source: "District Health Office",
    },
     {
      id: 4,
      title: t.heatwave,
      area: t.all_regions,
      description: t.heatwave_desc,
      severity: "Low",
      tip: "Drink plenty of water, wear light clothing, and stay in the shade during the hottest parts of the day.",
      source: "IMD Weather Reports",
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Siren className="text-destructive" />
          {t.alerts}
        </CardTitle>
        <CardDescription className="text-base">
          {t.alerts_description}
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
                      <strong>{t.area}:</strong> {alert.area}
                    </p>
                   </div>
                   <Badge variant={config.badge}>{alert.severity}</Badge>
                </div>
                <p className="text-sm flex-grow">{alert.description}</p>
                 <p className="text-xs italic opacity-70 mt-2">Tip: {alert.tip}</p>
                 <p className="text-xs italic text-right opacity-60 mt-2">
                    Source: {alert.source}
                  </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
