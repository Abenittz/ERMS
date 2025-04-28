'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Info } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Define the percentage options
const percentageOptions = [
  { value: '100%', label: '100%', description: 'Excellent' },
  { value: '90%-99%', label: '90%-99%', description: 'Very Good' },
  { value: '70%-90%', label: '70%-90%', description: 'Good' },
  { value: '<70%', label: '<70%', description: 'Needs Improvement' },
];

// Define the form schema with Zod
const formSchema = z.object({
  serviceReportId: z.number(),
  userId: z.number(),
  courtesy: z.string({
    required_error: "Please rate the technician's courtesy.",
  }),
  communication: z.string({
    required_error: "Please rate the technician's communication.",
  }),
  friendliness: z.string({
    required_error: "Please rate the technician's friendliness.",
  }),
  professionalism: z.string({
    required_error: "Please rate the technician's professionalism.",
  }),
  overallSatisfaction: z.string({
    required_error: 'Please rate your overall satisfaction.',
  }),
  comments: z
    .string()
    .min(5, {
      message: 'Comments must be at least 5 characters.',
    })
    .max(500, {
      message: 'Comments must not exceed 500 characters.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
  serviceReportId: number;
  userId: number;
  existingFeedback?: Partial<FormValues> | null;
  onSubmit: (feedback: FormValues) => void;
}

export function FeedbackDialog({
  open,
  onOpenChange,
  request,
  serviceReportId,
  userId,
  existingFeedback,
  onSubmit,
}: FeedbackDialogProps) {
  const [activeTab, setActiveTab] = useState('ratings');

  // Initialize the form with default values or existing feedback
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: existingFeedback || {
      serviceReportId,
      userId,
      courtesy: '',
      communication: '',
      friendliness: '',
      professionalism: '',
      overallSatisfaction: '',
      comments: '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const fields = [
      'courtesy',
      'communication',
      'friendliness',
      'professionalism',
      'overallSatisfaction',
      'comments',
    ];
    const filledFields = fields.filter(
      field => !!form.getValues(field as keyof FormValues),
    );
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const completion = calculateCompletion();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
          <DialogDescription>
            Share your experience with the repair service for your{' '}
            {request.deviceName} {request.deviceModel}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex items-center justify-between rounded-md bg-slate-50 p-3">
              <div>
                <p className="text-sm font-medium">Feedback Completion</p>
                <p className="text-xs text-slate-500">
                  Please complete all sections
                </p>
              </div>
              <div className="relative h-10 w-10">
                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke={completion === 100 ? '#10b981' : '#3b82f6'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${(completion / 100) * 100} 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {completion}%
                </div>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-50">
                <TabsTrigger value="ratings" className="">
                  Ratings
                </TabsTrigger>
                <TabsTrigger value="comments" className="">
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ratings" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="courtesy"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">Courtesy</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60 text-xs">
                                Rate how courteous and respectful the technician
                                was during the service.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {percentageOptions.map(option => {
                            const isSelected = field.value === option.value;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                variant={'outline'}
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  'flex h-16 flex-col items-start rounded-lg border p-4 transition-all',
                                  isSelected
                                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-slate-400',
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'text-base font-semibold',
                                      isSelected
                                        ? 'text-green-600'
                                        : 'text-slate-800',
                                    )}
                                  >
                                    {option.description}
                                  </span>
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {option.label}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">
                          Communication
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60 text-xs">
                                Rate how well the technician explained the
                                issues and solutions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {percentageOptions.map(option => {
                            const isSelected = field.value === option.value;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                variant={'outline'}
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  'flex h-16 flex-col items-start rounded-lg border p-4 transition-all',
                                  isSelected
                                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-slate-400',
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'text-base font-semibold',
                                      isSelected
                                        ? 'text-green-600'
                                        : 'text-slate-800',
                                    )}
                                  >
                                    {option.description}
                                  </span>
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {option.label}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="friendliness"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">
                          Friendliness
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60 text-xs">
                                Rate how friendly and approachable the
                                technician was during the service.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {percentageOptions.map(option => {
                            const isSelected = field.value === option.value;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                variant={'outline'}
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  'flex h-16 flex-col items-start rounded-lg border p-4 transition-all',
                                  isSelected
                                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-slate-400',
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'text-base font-semibold',
                                      isSelected
                                        ? 'text-green-600'
                                        : 'text-slate-800',
                                    )}
                                  >
                                    {option.description}
                                  </span>
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {option.label}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalism"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">
                          Professionalism
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60 text-xs">
                                Rate the technician&apos;s knowledge, expertise,
                                and professional conduct.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {percentageOptions.map(option => {
                            const isSelected = field.value === option.value;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                variant={'outline'}
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  'flex h-16 flex-col items-start rounded-lg border p-4 transition-all',
                                  isSelected
                                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-slate-400',
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'text-base font-semibold',
                                      isSelected
                                        ? 'text-green-600'
                                        : 'text-slate-800',
                                    )}
                                  >
                                    {option.description}
                                  </span>
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {option.label}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="overallSatisfaction"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-medium">
                          Overall Satisfaction
                        </FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-60 text-xs">
                                Rate your overall satisfaction with the repair
                                service.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {percentageOptions.map(option => {
                            const isSelected = field.value === option.value;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                variant={'outline'}
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  'flex h-16 flex-col items-start rounded-lg border p-4 transition-all',
                                  isSelected
                                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                    : 'border-slate-200 hover:border-slate-400',
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      'text-base font-semibold',
                                      isSelected
                                        ? 'text-green-600'
                                        : 'text-slate-800',
                                    )}
                                  >
                                    {option.description}
                                  </span>
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {option.label}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={() => setActiveTab('comments')}
                  >
                    Next: Add Comments
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share your experience with the repair service..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your feedback helps us improve our service. Please
                        provide any additional comments or suggestions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('ratings')}
                  >
                    Back to Ratings
                  </Button>
                  <Button type="submit" disabled={completion < 100}>
                    Submit Feedback
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={completion < 100}>
                Submit Feedback
              </Button>
            </DialogFooter> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
