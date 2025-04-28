'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useRepairRequest } from '@/hooks/repair/use-repair';
import { requestFormSchema, RequestInputs } from '@/lib/validation/request';
import { useUserStore } from '@/store/user-store';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

export default function RequestForm() {
  const { user } = useUserStore();
  const currentUser = useUserStore(state => state.user);

  const form = useForm<RequestInputs>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      userId: currentUser?.id,
      requestNumber: '', // can auto-generate or fetch from backend
      department: 'IT Department',
      requesterName: currentUser?.firstName + ' ' + currentUser?.lastName,
      contactPhone: currentUser?.phone,
      deviceName: '',
      deviceModel: '',
      serialNumber: '',
      assetNumber: '',
      problemDescription: '',
      priority: 'Medium',
      buildingBlockNumber: '',
      officeNumber: '',
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
    const generatedRequestNumber = `REQ-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${Math.floor(
      Math.random() * 1000,
    )
      .toString()
      .padStart(3, '0')}`;
    form.setValue('requestNumber', generatedRequestNumber);
  }, [form]);

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-accent">
            <Plus className="text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-0 sm:max-w-[600px]">
          <DialogHeader className="flex flex-row items-start justify-start gap-4 p-6">
            <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-md">
              <MessageSquare className="text-primary" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <DialogTitle>Repairment Request Form</DialogTitle>
              <DialogDescription>
                Fill out this form to request repairment
              </DialogDescription>
            </div>
          </DialogHeader>
          <div>
            <ScrollArea className="h-[600px] w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
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

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="buildingBlockNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Building / Block Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter building number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="officeNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Office Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter office number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

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
                  <DialogFooter className="border-t-accent sticky bottom-0 flex w-full justify-end gap-3 border-t bg-white p-4">
                    <Button variant={'outline'} className="px-5">
                      Cancel
                    </Button>
                    <Button className="px-10">Submit</Button>
                  </DialogFooter>
                </form>
              </Form>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
