'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { UserProfile, useUserStore } from '@/store/user-store';

// Define the user profile type
//  interface UserProfile {
//   id: number;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   gender: string;
//   dateOfBirth: string;
//   email: string;
//   phone: string;
//   profession: string;
//   profileImage: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   role: {
//     id: number;
//     name: string;
//   };
// }

// Sample user data
const sampleUserProfile: UserProfile = {
  id: 1,
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  gender: 'Male',
  dateOfBirth: '1995-08-15',
  email: 'jhon@gmail.com',
  phone: '1234567890',
  profession: 'Engineer',
  profileImage: 'https://example.com/image.jpg',
  status: 'active',
  createdAt: '2025-04-19T10:25:01.000Z',
  updatedAt: '2025-04-19T10:25:01.000Z',
  role: {
    id: 1,
    name: 'admin',
  },
};

// Form validation schema
const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  gender: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' }),
  profession: z
    .string()
    .min(2, { message: 'Profession must be at least 2 characters.' }),
  status: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSheet({ open, onOpenChange }: ProfileSheetProps) {
  const userProfile = useUserStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(
    userProfile || sampleUserProfile,
  );

  // Convert string date to Date object for the form
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    gender: profile.gender,
    dateOfBirth: new Date(profile.dateOfBirth),
    email: profile.email,
    phone: profile.phone,
    profession: profile.profession,
    status: profile.status,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would send this data to your API
    console.log(data);

    // Update the local profile state
    setProfile({
      ...profile,
      firstName: data.firstName,
      middleName: data.middleName || '',
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
      email: data.email,
      phone: data.phone,
      profession: data.profession,
      status: data.status,
      updatedAt: new Date().toISOString(),
    });

    // Exit edit mode
    setIsEditing(false);
  }

  function cancelEdit() {
    // Reset form to current profile values
    form.reset(defaultValues);
    setIsEditing(false);
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto bg-white p-6 sm:max-w-md">
        <SheetHeader className="p-0">
          <SheetTitle>User Profile</SheetTitle>
        </SheetHeader>

        <div className="pt-0 pb-6">
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="mb-6 flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profile.profileImage || '/placeholder.svg'}
                      alt={profile.firstName}
                    />
                    <AvatarFallback className="text-2xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Middle name (optional)"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input placeholder="Profession" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="bg-accent rounded-lg py-6">
                <div className="mb-6 flex justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profile.profileImage || '/placeholder.svg'}
                      alt={profile.firstName}
                    />
                    <AvatarFallback className="text-2xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profile.profession}</p>
                  <div className="mt-2 inline-flex items-center rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 capitalize">
                    {profile.role.name}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name</span>
                    <span className="font-medium">
                      {profile.firstName} {profile.middleName}{' '}
                      {profile.lastName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="font-medium">{profile.gender}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date of Birth</span>
                    <span className="font-medium">
                      {formatDate(profile.dateOfBirth)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{profile.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{profile.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profession</span>
                    <span className="font-medium">{profile.profession}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={cn(
                        'font-medium capitalize',
                        profile.status === 'active'
                          ? 'text-green-600'
                          : 'text-red-600',
                      )}
                    >
                      {profile.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium capitalize">
                      {profile.role.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {formatDate(profile.createdAt)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">
                      {formatDate(profile.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
