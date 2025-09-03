import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SymptomChecker } from "@/components/symptom-checker";
import { PreventiveCare } from "@/components/preventive-care";
import { VaccinationSchedule } from "@/components/vaccination-schedule";
import { HealthAlerts } from "@/components/health-alerts";
import { ContactChannels } from "@/components/contact-channels";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground mb-2">
            Welcome to Al-Driven Public Health Bot
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            “Sehat ki sahi jaankari, Swasth jeevan ka sathi”
          </p>
        </div>

        <div className="grid gap-8">
          <SymptomChecker />
          <HealthAlerts />
          <PreventiveCare />
          <VaccinationSchedule />
          <ContactChannels />
        </div>
      </main>
      <Footer />
    </div>
  );
}
