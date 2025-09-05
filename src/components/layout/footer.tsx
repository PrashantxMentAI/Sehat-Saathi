"use client";

import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, HeartPulse } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card py-8 text-center text-muted-foreground border-t">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-2 mb-4">
           <HeartPulse className="h-6 w-6 text-primary heartbeat" />
           <p className="font-semibold text-lg">Trusted by Doctors</p>
        </div>
        <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
        </div>
        <p>&copy; {year} HealthWise AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
