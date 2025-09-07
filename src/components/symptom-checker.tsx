"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, User, Sparkles, Search, Mic } from "lucide-react";
import { symptomChecker, type SymptomCheckerOutput } from "@/ai/flows/symptom-checker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";

// A global variable to hold the speech recognition instance
let recognition: SpeechRecognition | null = null;

export function SymptomChecker() {
  const { t, language } = useLanguage();
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    symptoms: z.string().min(10, {
      message: t.symptoms_error,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  useEffect(() => {
    // Initialize SpeechRecognition only on the client side
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        const currentSymptoms = form.getValues("symptoms");
        form.setValue("symptoms", currentSymptoms + finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        toast({
          variant: "destructive",
          title: "Voice Input Error",
          description: "Could not recognize audio. Please try again.",
        });
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [form, toast]);
  
  useEffect(() => {
    if (recognition) {
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    }
  }, [language]);

  const handleVoiceInput = () => {
    if (!recognition) {
      toast({
        variant: "destructive",
        title: "Feature Not Supported",
        description: "Your browser does not support voice recognition.",
      });
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      form.setValue("symptoms", ""); // Clear previous text
      recognition.start();
    }
    setIsRecording(!isRecording);
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await symptomChecker({ symptoms: values.symptoms });
      setResult(response);
    } catch (error) {
      console.error("Symptom checker error:", error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Failed to get results. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <User className="text-primary" />
          {t.symptoms}
        </CardTitle>
        <CardDescription className="text-base">
          {t.symptoms_description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder={t.symptoms_placeholder}
                        className="min-h-[100px] rounded-md shadow-inner pr-12"
                        {...field}
                      />
                       <Button type="button" variant="ghost" size="icon" className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary ${isRecording ? 'text-blue-600' : ''}`} onClick={handleVoiceInput}>
                        <Mic className={`h-5 w-5 ${isRecording ? 'pulse-anim' : ''}`} />
                        <span className="sr-only">Use microphone</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" disabled={isLoading || isRecording} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold">
              {isLoading ? t.analyzing : t.check_symptoms}
              <Search className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || result) && (
        <CardFooter>
          <div className="w-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bot className="text-accent" />
              {t.possible_causes}
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            ) : result ? (
              <div className="prose prose-sm max-w-none text-card-foreground dark:text-gray-300">
                <ul className="list-disc pl-5 space-y-2">
                  {result.potentialHealthConcerns.split('\n').map((item, index) => item.trim() && (
                    <li key={index}>{item.replace(/^- /, '').trim()}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 p-2 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-md border-l-4 border-yellow-400">
                  <strong>{t.disclaimer.split(':')[0]}:</strong> {t.disclaimer.split(':')[1]}
                </p>
              </div>
            ) : null}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
