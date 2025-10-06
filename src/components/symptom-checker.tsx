
"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, User, Sparkles, Search, Mic, Trash2, History, ShieldQuestion } from "lucide-react";
// Removed AI flow import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { parseAIResponse } from "@/lib/utils";

// Dummy result structure for non-AI version
interface SymptomCheckerOutput {
  potentialHealthConcerns: string;
  precautionsAndSuggestions: string;
}

// A global variable to hold the speech recognition instance
let recognition: SpeechRecognition | null = null;
if (typeof window !== 'undefined') {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
  }
}

interface HistoryItem {
  id: string;
  symptoms: string;
  result: SymptomCheckerOutput;
  timestamp: string;
}

export function SymptomChecker() {
  const { t, language } = useLanguage();
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();
  const finalTranscriptRef = useRef('');
  const recognitionstopTimer = useRef<NodeJS.Timeout | null>(null);

  // Removed history logic as it's not relevant for non-AI version
  
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
  
  const { handleSubmit, setValue, trigger } = form;

    useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      if (recognitionstopTimer.current) {
        clearTimeout(recognitionstopTimer.current);
        recognitionstopTimer.current = null;
      }
    };

    recognition.onresult = (event) => {
      if (recognitionstopTimer.current) {
        clearTimeout(recognitionstopTimer.current);
      }

      let interimTranscript = '';
      finalTranscriptRef.current = '';
      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript.trim() + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setValue("symptoms", finalTranscriptRef.current + interimTranscript, { shouldValidate: true });

      recognitionstopTimer.current = setTimeout(() => {
         recognition?.stop();
      }, 1500);
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

    recognition.onend = async () => {
      setIsRecording(false);
      if (recognitionstopTimer.current) {
        clearTimeout(recognitionstopTimer.current);
        recognitionstopTimer.current = null;
      }
      const isFormValid = await trigger("symptoms");
      if (isFormValid) {
        handleSubmit(onSubmit)();
      }
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
       if (recognitionstopTimer.current) {
        clearTimeout(recognitionstopTimer.current);
      }
    };
  }, [handleSubmit, setValue, toast, trigger, language]);

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
      finalTranscriptRef.current = "";
      setValue("symptoms", "");
      recognition.start();
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isRecording) {
      recognition?.stop();
    }
    setIsLoading(true);
    setResult(null);

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Static response instead of calling AI
    const staticResponse: SymptomCheckerOutput = {
      potentialHealthConcerns: language === 'en' ? "Please consult a doctor." : "कृपया डॉक्टर से सलाह लें।",
      precautionsAndSuggestions: language === 'en' 
        ? `Based on your symptoms, we recommend consulting a healthcare professional for an accurate diagnosis. Self-diagnosis can be misleading.\n\n**When to see a doctor urgently:**\n- If symptoms are severe or worsen rapidly.\n- If you have difficulty breathing or chest pain.`
        : `आपके लक्षणों के आधार पर, हम एक सटीक निदान के लिए स्वास्थ्य देखभाल पेशेवर से परामर्श करने की सलाह देते हैं। स्व-निदान भ्रामक हो सकता है।\n\n**तत्काल डॉक्टर को कब दिखाएँ:**\n- यदि लक्षण गंभीर हैं या तेजी से बिगड़ते हैं।\n- यदि आपको सांस लेने में कठिनाई या सीने में दर्द हो।`
    };

    setResult(staticResponse);
    form.reset();
    setIsLoading(false);
  }

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  }

  return (
    <TooltipProvider>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <User className="text-primary" />
              {t.symptoms}
            </CardTitle>
            <CardDescription className="text-base">
              {t.symptoms_description.split("Please consult a qualified doctor for medical advice.")[0]}
              <strong>{language === 'en' ? "Please consult a qualified doctor for medical advice." : "कृपया चिकित्सकीय सलाह के लिए एक योग्य चिकित्सक से परामर्श करें।"}</strong>
            </CardDescription>
          </div>
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
              <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold">
                {isLoading ? t.analyzing : t.check_symptoms}
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </CardContent>
        {(isLoading || result) && (
          <CardFooter>
            <div className="w-full space-y-6">
              <div>
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
                ) : result?.potentialHealthConcerns ? (
                  <div className="prose prose-sm max-w-none text-card-foreground dark:text-gray-300">
                    <ul className="list-disc pl-5 space-y-2">
                      {result.potentialHealthConcerns.split('\n').map((item, index) => item.trim() && (
                        <li key={index}>{item.replace(/^- /, '').trim()}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {isLoading || (result && result.precautionsAndSuggestions) ? (
                 <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ShieldQuestion className="text-green-600" />
                      {t.precautions_title}
                    </h3>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    ) : result?.precautionsAndSuggestions ? (
                      <div
                        className="prose prose-sm max-w-none text-card-foreground dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: parseAIResponse(result.precautionsAndSuggestions) }}
                      />
                    ) : null}
                  </div>
              ) : null}

              {result && (
                <p className="text-xs text-muted-foreground mt-4 p-2 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-md border-l-4 border-yellow-400">
                  <strong>{t.disclaimer.split(':')[0]}:</strong> {t.disclaimer.split(':')[1]}
                </p>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </TooltipProvider>
  );
}
