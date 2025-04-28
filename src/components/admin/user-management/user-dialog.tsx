'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/store/user-store';

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
  profileImage: z.string(),
  role: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserDialogProps {
  user: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (user: UserProfile) => void;
  onDelete: (userId: number, roleId: number) => void;
}

export function UserDialog({
  user,
  open,
  onOpenChange,
  onUpdate,
  onDelete,
}: Readonly<UserDialogProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Convert string date to Date object for the form
  const defaultValues: ProfileFormValues = {
    ...user,
    dateOfBirth: new Date(user.dateOfBirth),
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    // Update the user
    onUpdate({
      ...user,
      ...data,
      dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
    });

    // Exit edit mode
    setIsEditing(false);
  }

  function cancelEdit() {
    // Reset form to current user values
    form.reset(defaultValues);
    setIsEditing(false);
  }

  function handleDelete() {
    onDelete(user.id, user.role.id);
    setConfirmDelete(false);
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  // Get full name
  const getFullName = () => {
    return `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="overflow-y-auto bg-white p-6 sm:max-w-xl">
          <SheetHeader className="space-y-1">
            <SheetTitle className="text-2xl">
              {user.role.name === 'user' ? 'User' : 'Technician'} Details
            </SheetTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant={user.status === 'active' ? 'default' : 'secondary'}
                className={
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800'
                }
              >
                {user.status}
              </Badge>
              <Badge variant="outline">{user.role.name}</Badge>
            </div>
          </SheetHeader>

          <div className="py-6">
            {isEditing ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="mb-6 flex justify-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={user.profileImage || '/placeholder.svg'}
                        alt={user.firstName}
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
                            <SelectItem value="Other">Other</SelectItem>
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
                                date > new Date() ||
                                date < new Date('1900-01-01')
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                    >
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
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6 pt-4">
                    <div className="mb-6 flex justify-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={user.profileImage || '/placeholder.svg'}
                          alt={user.firstName}
                        />
                        <AvatarFallback className="text-2xl">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold">{getFullName()}</h2>
                      <p className="text-muted-foreground">{user.profession}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-lg font-medium">
                          Detail Information
                        </h3>
                        <div className="flex gap-2">
                          {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button> */}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setConfirmDelete(true)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Full Name
                          </span>
                          <span className="font-medium">{getFullName()}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gender</span>
                          <span className="font-medium">{user.gender}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Date of Birth
                          </span>
                          <span className="font-medium">
                            {formatDate(user.dateOfBirth)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium">{user.email}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span className="font-medium">{user.phone}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Profession
                          </span>
                          <span className="font-medium">{user.profession}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span
                            className={cn(
                              'font-medium capitalize',
                              user.status === 'active'
                                ? 'text-green-600'
                                : 'text-red-600',
                            )}
                          >
                            {user.status}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Role</span>
                          <span className="font-medium capitalize">
                            {user.role.name}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Member Since
                          </span>
                          <span className="font-medium">
                            {formatDate(user.createdAt)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Last Updated
                          </span>
                          <span className="font-medium">
                            {formatDate(user.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-6 pt-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <h3 className="text-lg font-medium">Recent Activity</h3>
                    </div>

                    <div className="space-y-4">
                      {user.role.name === 'technician' ? (
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-100">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Completed repair request
                              </p>
                              <p className="text-muted-foreground text-sm">
                                REQ-2025-04-23-215
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                2 days ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-100">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Assigned to repair request
                              </p>
                              <p className="text-muted-foreground text-sm">
                                REQ-2025-04-22-214
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                3 days ago
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-100">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Submitted repair request
                              </p>
                              <p className="text-muted-foreground text-sm">
                                REQ-2025-04-23-215
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                2 days ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-green-100">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Provided feedback</p>
                              <p className="text-muted-foreground text-sm">
                                For repair request REQ-2025-04-20-212
                              </p>
                              <p className="text-muted-foreground mt-1 text-xs">
                                5 days ago
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              {getFullName()}&apos;s account and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
