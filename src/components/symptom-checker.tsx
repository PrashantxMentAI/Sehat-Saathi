"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, User, Sparkles } from "lucide-react";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-primary" />
          AI Symptom Checker
        </CardTitle>
        <CardDescription>
          Describe your symptoms, and our AI will provide a list of potential health concerns. This is not a medical diagnosis.
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
                  <FormLabel className="flex items-center gap-2">
                    <User />
                    Your Symptoms
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I have a headache, fever, and a sore throat..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Analyzing..." : "Check Symptoms"}
              {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || result) && (
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="text-accent" />
              Potential Concerns
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            ) : result ? (
              <div className="prose prose-sm max-w-none text-card-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  {result.potentialHealthConcerns.split('\n').map((item, index) => item.trim() && (
                    <li key={index}>{item.replace(/^- /, '').trim()}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
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
