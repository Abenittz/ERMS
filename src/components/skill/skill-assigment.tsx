'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserProfile } from '@/store/user-store';

interface Skill {
  id: number;
  name: string;
}

interface Technician {
  id: number;
  name: string;
  avatar: string;
  department: string;
}

interface TechnicianSkill {
  userId: number;
  skillId: number;
}

interface SkillAssignmentProps {
  skills: Skill[];
  technicians: UserProfile[];
  technicianSkills: TechnicianSkill[];
  onAssignSkill: (userId: number, skillId: number) => void;
  isLoading: boolean;
}

// Define the form schema with Zod
const formSchema = z.object({
  technicianId: z.string().min(1, {
    message: 'Please select a technician.',
  }),
  skillId: z.string().min(1, {
    message: 'Please select a skill.',
  }),
});

export function SkillAssignment({
  skills,
  technicians,
  technicianSkills,
  onAssignSkill,
  isLoading,
}: SkillAssignmentProps) {
  const [selectedTechnician, setSelectedTechnician] =
    useState<UserProfile | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technicianId: '',
      skillId: '',
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userId = Number.parseInt(values.technicianId);
    const skillId = Number.parseInt(values.skillId);
    onAssignSkill(userId, skillId);
  };

  // Update selected technician when the selection changes
  const handleTechnicianChange = (value: string) => {
    const technician =
      technicians.find(t => t.id === Number.parseInt(value)) || null;
    setSelectedTechnician(technician);
    form.setValue('technicianId', value);
  };

  // Get assigned skills for the selected technician
  const getAssignedSkills = () => {
    if (!selectedTechnician) return [];
    return technicianSkills
      .filter(ts => ts.userId === selectedTechnician.id)
      .map(ts => skills.find(s => s.id === ts.skillId))
      .filter((s): s is Skill => s !== undefined);
  };

  // Get available skills (not yet assigned) for the selected technician
  const getAvailableSkills = () => {
    if (!selectedTechnician) return skills;
    const assignedSkillIds = new Set(
      technicianSkills
        .filter(ts => ts.userId === selectedTechnician.id)
        .map(ts => ts.skillId),
    );
    return skills.filter(skill => !assignedSkillIds.has(skill.id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Assignment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Assign Skill to Technician</CardTitle>
          <CardDescription>
            Select a technician and a skill to assign
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="technicianId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technician</FormLabel>
                    <Select
                      onValueChange={handleTechnicianChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a technician" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {technicians.map(technician => (
                          <SelectItem
                            key={technician.id}
                            value={technician.id.toString()}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={
                                    technician.profileImage ||
                                    '/placeholder.svg'
                                  }
                                  alt={technician.firstName}
                                />
                                <AvatarFallback>
                                  {technician.firstName.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{technician.firstName}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the technician to assign a skill to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getAvailableSkills().map(skill => (
                          <SelectItem
                            key={skill.id}
                            value={skill.id.toString()}
                          >
                            {skill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the skill to assign to the technician.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isLoading || getAvailableSkills().length === 0}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Assign Skill
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Technician Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Details</CardTitle>
          <CardDescription>
            View assigned skills for the selected technician
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedTechnician ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedTechnician.profileImage || '/placeholder.svg'}
                    alt={selectedTechnician.firstName}
                  />
                  <AvatarFallback>
                    {selectedTechnician.firstName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {selectedTechnician.firstName}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedTechnician.profession}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">Assigned Skills</h4>
                <div className="space-y-2">
                  {getAssignedSkills().length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No skills assigned yet.
                    </p>
                  ) : (
                    getAssignedSkills().map(skill => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 rounded-md border bg-slate-50 p-2"
                      >
                        <div className="rounded-full bg-indigo-100 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-indigo-600"
                          >
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                        </div>
                        <span className="text-sm">{skill.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No technician selected</h3>
              <p className="mt-1 text-sm text-slate-500">
                Select a technician to view their details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
