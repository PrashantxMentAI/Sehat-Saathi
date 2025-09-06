
"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

export function DailyHealthTip() {
  const { t } = useLanguage();
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Pick a tip based on today's date to ensure it changes daily
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % t.health_tips.length;
    setTip(t.health_tips[index]);
  }, [t.health_tips]);

  if (!tip) {
    return null;
  }

  return (
    <div className="bg-primary/10 text-primary dark:text-primary-foreground/90 dark:bg-primary/20 p-3 rounded-lg shadow-md text-center font-medium">
      <p>
        <span className="font-bold">{t.daily_tip_title}</span> {tip}
      </p>
    </div>
  );
}
