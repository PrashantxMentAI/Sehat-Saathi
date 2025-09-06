"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-1">
          <Image src="/logoo.png" alt="Sehat Saathi logo" width={48} height={48} />
          <span className="text-2xl font-bold font-headline relative -top-0.5">Sehat Saathi</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              <span>{language === 'en' ? t.lang_english : t.lang_hindi}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>{t.lang_english}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>{t.lang_hindi}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
