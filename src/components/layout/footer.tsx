"use client";

import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 text-center text-muted-foreground">
      <p>&copy; {year} HealthWise AI. All rights reserved.</p>
    </footer>
  );
}
