'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react';
import React from 'react';
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

export default function RequestForm() {
  const form = useForm<RequestInputs>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      faculty: '',
      department: '',
      phone: '',
      block: '',
      office: '',
      equipment: '',
      model: '',
      description: '',
    },
  });

  const onSubmit = async (data: RequestInputs) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="mt-3">
      <Card className="w-[650px]">
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
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="faculty"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Faculty</FormLabel>
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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-5 md:flex-row">
                  <FormField
                    control={form.control}
                    name="block"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="email">Block</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter block number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="office"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor="email">Office</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                  name="phone"
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
                  name="equipment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">
                        Equipment to be repaired
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
                  name="model"
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
                  name="description"
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
              </form>
            </Form>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex w-full justify-end gap-3">
          <Button variant={'outline'} className="px-5">
            Cancel
          </Button>
          <Button className="px-10">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
