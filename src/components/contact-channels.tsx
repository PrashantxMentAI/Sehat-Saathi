"use client";

import { MessageSquareText, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export function ContactChannels() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.contact_title}</CardTitle>
        <CardDescription>
          {t.contact_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="w-full" size="lg" style={{ backgroundColor: '#25D366', color: 'white' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1DAA54'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}>
            <MessageSquareText className="mr-2 h-5 w-5" />
            {t.contact_whatsapp}
          </Button>
          <Button className="w-full" size="lg" variant="secondary">
            <Smartphone className="mr-2 h-5 w-5" />
            {t.contact_sms}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
