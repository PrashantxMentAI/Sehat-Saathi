
"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, User, Sparkles, Search, Mic, Trash2, History, ShieldQuestion } from "lucide-react";
import { symptomChecker, type SymptomCheckerOutput } from "@/ai/flows/symptom-checker";
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

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("symptomCheckerHistory");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("symptomCheckerHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

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
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      form.setValue("symptoms", finalTranscriptRef.current + interimTranscript, { shouldValidate: true });
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
      finalTranscriptRef.current = form.getValues("symptoms");
      recognition.start();
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isRecording) {
      recognition?.stop();
    }
    setIsLoading(true);
    setResult(null);
    try {
      const response = await symptomChecker({ symptoms: values.symptoms });
      setResult(response);
      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        symptoms: values.symptoms,
        result: response,
        timestamp: new Date().toLocaleString(),
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
      form.reset();
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

  const handleClearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };
  
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
          {history.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleHistory}>
                  <History className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showHistory ? t.history_hide : t.history_show}</p>
              </TooltipContent>
            </Tooltip>
          )}
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

      {showHistory && history.length > 0 && (
          <Card className="shadow-lg rounded-lg mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                  <History className="text-primary" />
                  {t.history_title}
                </CardTitle>
                <CardDescription>{t.history_description}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleClearHistory}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t.history_clear}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {history.map((item) => (
                <div key={item.id}>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold flex items-center gap-2 mb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span>{t.history_your_symptoms}</span>
                      </div>
                      <p className="text-muted-foreground text-sm italic">"{item.symptoms}"</p>
                    </div>
                    <div>
                      <div className="font-semibold flex items-center gap-2 mb-2">
                        <Bot className="h-5 w-5 text-primary" />
                         <span>{t.history_ai_response}</span>
                      </div>
                      <div className="prose prose-sm max-w-none text-card-foreground dark:text-gray-300 space-y-4">
                        {item.result.potentialHealthConcerns && (
                            <div>
                                <h4 className="font-medium text-sm">{t.possible_causes}</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {item.result.potentialHealthConcerns.split('\n').map((concern, index) => concern.trim() && (
                                    <li key={index}>{concern.replace(/^- /, '').trim()}</li>
                                  ))}
                                </ul>
                            </div>
                        )}
                        {item.result.precautionsAndSuggestions && (
                            <div>
                                <h4 className="font-medium text-sm">{t.precautions_title}</h4>
                                <div
                                  className="prose prose-sm max-w-none text-card-foreground dark:text-gray-300"
                                  dangerouslySetInnerHTML={{ __html: parseAIResponse(item.result.precautionsAndSuggestions) }}
                                />
                            </div>
                        )}
                      </div>
                    </div>
                     <p className="text-xs text-right text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <Separator className="my-6" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
    </TooltipProvider>
  );
}

    