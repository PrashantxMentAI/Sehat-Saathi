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
      tip: t.flu_tip,
      source: t.flu_source,
    },
    {
      id: 2,
      title: t.dengue,
      area: t.semi_urban,
      description: t.dengue_desc,
      severity: "Medium",
      tip: t.dengue_tip,
      source: t.dengue_source,
    },
    {
      id: 3,
      title: t.measles,
      area: t.rural_district,
      description: t.measles_desc,
      severity: "High",
      tip: t.measles_tip,
      source: t.measles_source,
    },
     {
      id: 4,
      title: t.heatwave,
      area: t.all_regions,
      description: t.heatwave_desc,
      severity: "Low",
      tip: t.heatwave_tip,
      source: t.heatwave_source,
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
                 <p className="text-xs italic opacity-70 mt-2">{t.tip}: {alert.tip}</p>
                 <p className="text-xs italic text-right opacity-60 mt-2">
                    {t.source}: {alert.source}
                  </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
