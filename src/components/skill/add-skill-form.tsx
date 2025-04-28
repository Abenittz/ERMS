'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the form schema with Zod
const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Skill name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Skill name must not exceed 50 characters.',
    }),
});

interface AddSkillFormProps {
  onAddSkill: (skillName: string) => void;
  isLoading: boolean;
}

export function AddSkillForm({ onAddSkill, isLoading }: AddSkillFormProps) {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddSkill(values.name);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Skill</CardTitle>
        <CardDescription>
          Create a new skill that can be assigned to technicians
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Software Maintenance"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a descriptive name for the skill.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
