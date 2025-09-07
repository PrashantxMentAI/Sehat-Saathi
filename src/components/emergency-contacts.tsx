
"use client";

import { Phone, Ambulance, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export function EmergencyContacts() {
  const { t } = useLanguage();

  const contacts = [
    {
      name: t.emergency_ambulance,
      number: "102 / 108",
      icon: <Ambulance className="h-8 w-8 text-red-500" />,
      style: "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800"
    },
    {
      name: t.emergency_police,
      number: "100 / 112",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      style: "bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800"
    },
    {
      name: t.emergency_national,
      number: "112",
      icon: <Phone className="h-8 w-8 text-green-500" />,
      style: "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.emergency_title}</CardTitle>
        <CardDescription>
          {t.emergency_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${contact.style}`}>
              {contact.icon}
              <div>
                <p className="font-bold text-lg">{contact.name}</p>
                <a href={`tel:${contact.number}`} className="text-2xl font-bold tracking-wider hover:underline">
                  {contact.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
