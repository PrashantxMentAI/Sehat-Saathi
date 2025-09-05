// Create a new "Healthy Lifestyle Tips" section with 3 advice cards
// Each card should be for Children, Adults, and Older Adults
// Use Tailwind CSS for styling, rounded corners, and soft shadows
// Icons: child, user, and elderly (lucide-react icons)
// Keep layout clean, grid-based, and mobile responsive

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, User, HeartPulse } from "lucide-react";
import { ShieldCheck } from "lucide-react";

export default function HealthyLifestyleTips() {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <ShieldCheck className="text-primary" />
           Healthy Lifestyle Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Children */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-amber-50 dark:bg-amber-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Baby className="w-5 h-5" /> Children (0–12 yrs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Eat healthy food (fruits, veggies, milk).</li>
                <li>Play and stay active every day.</li>
                <li>Wash hands and brush teeth daily.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Adults */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-sky-100 dark:bg-sky-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <User className="w-5 h-5" /> Adults (13–59 yrs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Exercise at least 30 minutes daily.</li>
                <li>Eat a balanced diet and drink enough water.</li>
                <li>Sleep 7–8 hours and manage stress.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Older Adults */}
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-red-100 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <HeartPulse className="w-5 h-5" /> Older Adults (60+ yrs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Do light exercise like walking.</li>
                <li>Eat soft, nutritious meals.</li>
                <li>Get regular health checkups.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
