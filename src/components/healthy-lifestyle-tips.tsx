"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, User, HeartPulse } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function HealthyLifestyleTips() {
  const { t } = useLanguage();
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="text-primary" />
           {t.lifestyle_title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Children */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-amber-50 dark:bg-amber-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Baby className="w-5 h-5" /> {t.lifestyle_children_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t.lifestyle_children_tip1}</li>
                <li>{t.lifestyle_children_tip2}</li>
                <li>{t.lifestyle_children_tip3}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Adults */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-sky-100 dark:bg-sky-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <User className="w-5 h-5" /> {t.lifestyle_adults_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t.lifestyle_adults_tip1}</li>
                <li>{t.lifestyle_adults_tip2}</li>
                <li>{t.lifestyle_adults_tip3}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Older Adults */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-red-100 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <HeartPulse className="w-5 h-5" /> {t.lifestyle_seniors_title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>{t.lifestyle_seniors_tip1}</li>
                <li>{t.lifestyle_seniors_tip2}</li>
                <li>{t.lifestyle_seniors_tip3}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
