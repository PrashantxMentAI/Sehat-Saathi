"use client";

import { MessageSquareText, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactChannels() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Health Info on the Go</CardTitle>
        <CardDescription>
          Access HealthWise AI through your favorite messaging apps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="w-full" size="lg" style={{ backgroundColor: '#25D366', color: 'white' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1DAA54'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#25D366'}>
            <MessageSquareText className="mr-2 h-5 w-5" />
            Chat on WhatsApp
          </Button>
          <Button className="w-full" size="lg" variant="secondary">
            <Smartphone className="mr-2 h-5 w-5" />
            Use via SMS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
