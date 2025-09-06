import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SymptomChecker } from "@/components/symptom-checker";
import { PreventiveCare } from "@/components/preventive-care";
import { VaccinationSchedule } from "@/components/vaccination-schedule";
import { HealthAlerts } from "@/components/health-alerts";
import HealthyLifestyleTips from "@/components/healthy-lifestyle-tips";
import { ContactChannels } from "@/components/contact-channels";
import { Faq } from "@/components/faq";
import Image from "next/image";
import { HeartPulse, Syringe, Stethoscope, Zap } from "lucide-react";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative bg-gradient-to-r from-[#eaf2fa] via-[#f5f5f5] to-[#eaf6ef] dark:from-blue-900/30 dark:via-gray-900/30 dark:to-green-900/50 py-20 px-4">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
             {/* Abstract shapes can go here */}
          </div>
          <div className="container mx-auto grid grid-cols-1 items-center relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-800 dark:text-white mb-4">
                Welcome to{" "}
                <span className="text-green-600 dark:text-green-400">Sehat</span>{" "}
                <span className="text-blue-800 dark:text-blue-400">Saathi</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                “Sehat ki sahi jaankari, Swasth jeevan ka sathi”
              </p>
               <div className="mt-8 flex justify-center space-x-4">
                <div className="p-3 bg-white/50 rounded-full shadow-md heartbeat">
                  <HeartPulse className="h-8 w-8 text-red-500" />
                </div>
                <div className="p-3 bg-white/50 rounded-full shadow-md">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <div className="p-3 bg-white/50 rounded-full shadow-md">
                   <Syringe className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto p-4 md:p-8 grid gap-12">
          <SymptomChecker />
          <HealthAlerts />
          <HealthyLifestyleTips />
          <PreventiveCare />
          <VaccinationSchedule />
          <Faq />
          <ContactChannels />
        </div>
      </main>
      <Footer />
    </div>
  );
}
