'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RepairRequestResponse } from '@/lib/types/repairement';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/user-store';

import { Assignment } from '../admin/requests/repair-request-dashboard';
import { ScrollArea } from '../ui/scroll-area';

// Define the form schema with Zod
const formSchema = z.object({
  repairRequestId: z.number(),
  assignedTo: z.number(),
  status: z.string(),
  serviceDate: z.date(),
  technicianComments: z.string().min(5, {
    message: 'Technician comments must be at least 5 characters.',
  }),
  servicePerformed: z.string().min(5, {
    message: 'Service performed must be at least 5 characters.',
  }),
  partsUsed: z.string(),
  finalReadings: z.string().min(3, {
    message: 'Final readings must be at least 3 characters.',
  }),
  resultRating: z.string().regex(/^\d+%$/, {
    message: 'Result rating must be a percentage (e.g., 100%).',
  }),
  testResults: z
    .array(
      z.object({
        test: z.string().min(1, { message: 'Test name is required.' }),
        result: z.string().min(1, { message: 'Test result is required.' }),
      }),
    )
    .min(1, {
      message: 'At least one test result is required.',
    }),
});

export type ServiceReportInputs = z.infer<typeof formSchema>;

interface RepairProgressFormProps {
  request: Assignment;
  technician: any;
  onClose: () => void;
  onSubmit: (data: ServiceReportInputs) => void;
  isPending: boolean;
}

export function RepairProgressForm({
  request,
  technician,
  onClose,
  onSubmit,
  isPending,
}: RepairProgressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useUserStore(state => state.user);
  // Initialize the form with default values
  const form = useForm<ServiceReportInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repairRequestId: request.id,
      assignedTo: currentUser?.id ?? technician.id,
      status: 'Assigned',
      serviceDate: new Date(),
      technicianComments: '',
      servicePerformed: '',
      partsUsed: 'None',
      finalReadings: '',
      resultRating: '100%',
      testResults: [{ test: '', result: '' }],
    },
  });

  // Handle form submission
  const handleSubmit = async (values: ServiceReportInputs) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new test result field
  const addTestResult = () => {
    const currentTestResults = form.getValues('testResults');
    form.setValue('testResults', [
      ...currentTestResults,
      { test: '', result: '' },
    ]);
  };

  // Remove a test result field
  const removeTestResult = (index: number) => {
    const currentTestResults = form.getValues('testResults');
    if (currentTestResults.length > 1) {
      form.setValue(
        'testResults',
        currentTestResults.filter((_, index_) => index_ !== index),
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={open => !open && onClose()}>
      <DialogContent className="bg-white p-0 sm:max-w-4xl">
        <ScrollArea className="max-h-[90vh] p-6">
          <DialogHeader>
            <DialogTitle>Repair Progress Form</DialogTitle>
            <DialogDescription>
              Update the repair progress for request{' '}
              {request.RepairRequest.requestNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-10 py-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Request Details</h3>
              <div className="text-sm">
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">Request Number:</span>
                  <span>{request.RepairRequest.requestNumber}</span>
                </div>
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">Device:</span>
                  <span>
                    {request.RepairRequest.deviceName}{' '}
                    {request.RepairRequest.deviceModel}
                  </span>
                </div>
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">Requester:</span>
                  <span>{request.RepairRequest.requesterName}</span>
                </div>
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span>{request.RepairRequest.department}</span>
                </div>
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span>
                    <Badge
                      variant={
                        request.RepairRequest.priority === 'High'
                          ? 'destructive'
                          : request.RepairRequest.priority === 'Medium'
                            ? 'default'
                            : 'outline'
                      }
                    >
                      {request.RepairRequest.priority}
                    </Badge>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Problem Description</h3>
              <div className="min-h-[100px] rounded-md bg-slate-50 p-3 text-sm">
                {request.RepairRequest.problemDescription}
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Hidden fields */}
                <input type="hidden" {...form.register('repairRequestId')} />
                <input type="hidden" {...form.register('assignedTo')} />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Assigned">Assigned</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Current status of the repair
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Date */}
                <FormField
                  control={form.control}
                  name="serviceDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Service Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Date when the service was performed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Technician Comments */}
              <FormField
                control={form.control}
                name="technicianComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technician Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what you found and any troubleshooting steps taken"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed notes about the issue and troubleshooting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Performed */}
              <FormField
                control={form.control}
                name="servicePerformed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Performed</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the service or repair work performed"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Summary of the repair work completed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Parts Used */}
                <FormField
                  control={form.control}
                  name="partsUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parts Used</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="List any parts used for the repair"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter &quot;Non&quot; if no parts were used
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Final Readings */}
                <FormField
                  control={form.control}
                  name="finalReadings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Final Readings</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Final measurements or readings"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any final measurements or observations
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Result Rating */}
              <FormField
                control={form.control}
                name="resultRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result Rating</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 100%" {...field} />
                    </FormControl>
                    <FormDescription>
                      Rate the success of the repair as a percentage (e.g.,
                      100%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Test Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Test Results</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTestResult}
                    className="h-8"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add Test
                  </Button>
                </div>
                <FormDescription>
                  Add test-result pairs for any tests performed
                </FormDescription>

                {form.watch('testResults').map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`testResults.${index}.test`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Test name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`testResults.${index}.result`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Result" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Pass">Pass</SelectItem>
                                <SelectItem value="Fail">Fail</SelectItem>
                                <SelectItem value="N/A">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTestResult(index)}
                      disabled={form.watch('testResults').length <= 1}
                      className="h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {form.formState.errors.testResults?.message && (
                  <p className="text-destructive text-sm font-medium">
                    {form.formState.errors.testResults.message}
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Repair Progress'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
