"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, User, Sparkles, Search } from "lucide-react";
import { symptomChecker, type SymptomCheckerOutput } from "@/ai/flows/symptom-checker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

export function SymptomChecker() {
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

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
          Your Symptoms
        </CardTitle>
        <CardDescription className="text-base">
          This tool provides general health information, not a medical diagnosis. Please consult a qualified doctor for medical advice.
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
                        placeholder="e.g., I have a high fever, a persistent cough, and a runny nose..."
                        className="min-h-[100px] rounded-md shadow-inner"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold">
              {isLoading ? "Analyzing..." : "Check Symptoms"}
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
              Possible Causes
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
                  <strong>Disclaimer:</strong> This is an AI-generated list and not a substitute for professional medical advice. Please consult a healthcare provider for any health concerns.
                </p>
              </div>
            ) : null}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
