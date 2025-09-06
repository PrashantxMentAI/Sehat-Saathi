import Image from "next/image";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
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
              <span>English</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>हिन्दी</DropdownMenuItem>
            <DropdownMenuItem>Punjabi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
