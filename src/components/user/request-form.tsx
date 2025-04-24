'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { requestFormSchema, RequestInputs } from '@/lib/validation/request';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { useUserStore } from '@/store/userStore';
import { useRepairRequest } from '@/hooks/repair/use-repair';
import { toast } from 'sonner';

export default function RequestForm() {
  const { user } = useUserStore();

  const form = useForm<RequestInputs>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      requestNumber: '', // can auto-generate or fetch from backend
      department: 'IT Department',
      requesterName: user?.firstName + ' ' + user?.lastName,
      contactPhone: user?.phone,
      deviceName: '',
      deviceModel: '',
      serialNumber: '',
      assetNumber: '',
      problemDescription: '',
      priority: 'Medium',
    },
  });

  const { mutate, isPending } = useRepairRequest();

  const onSubmit = async (data: RequestInputs) => {
    console.log(data);
    const finalData = {
      ...data,
      requestDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    console.log(finalData);
    // Handle form submission logic here
    mutate(finalData, {
      onSuccess: response => {
        console.log('Repair request success', response);
        toast.success('Repair request submitted successfully');
        form.reset();
      },
      onError: error => {
        console.error('Repair request error', error);
        toast.error('Failed to submit repair request');
      },
    });
  };

  useEffect(() => {
    const date = new Date();
    const generatedReqNumber = `REQ-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${Math.floor(
      Math.random() * 1000,
    )
      .toString()
      .padStart(3, '0')}`;
    form.setValue('requestNumber', generatedReqNumber);
  }, [form]);

  return (
    <div className="mt-3">
      <Card className="w-[650px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CardHeader className="flex items-center gap-4">
              <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-md">
                <MessageSquare className="text-primary" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <CardTitle className="text-primary">
                  Repairement Request Form
                </CardTitle>
                <CardDescription>
                  Fill out this form to request repairment
                </CardDescription>
              </div>
            </CardHeader>
            <Separator className="px-4" />
            <CardContent>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IT Department">
                            IT Department
                          </SelectItem>
                          <SelectItem value="HR Department">
                            HR Department
                          </SelectItem>
                          <SelectItem value="Finance Department">
                            Finance Department
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requesterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requester Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">
                        Device Name / Equipment
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter equipment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceModel"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Model</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter model"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number</FormLabel>
                      <FormControl>
                        <Input placeholder="SN123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assetNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ASSET-00123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex w-full justify-end gap-3">
              <Button variant={'outline'} className="px-5">
                Cancel
              </Button>
              <Button className="px-10">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
