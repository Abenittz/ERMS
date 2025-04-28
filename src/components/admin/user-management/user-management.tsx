'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Plus, Users, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useDeleteUser,
  useGetTechnicians,
  useGetUsers,
  useUpdateUser,
} from '@/hooks/admin/use-get-users';
import { useRegistration } from '@/hooks/auth-hooks/use-auth';
import { UserFormData } from '@/lib/validation/auth';
import { UserProfile } from '@/store/user-store';

import { AddUserDialog } from './add-user-form';
import { UserDialog } from './user-dialog';
import { UserTable } from './user-table';

// Sample data for users
const sampleUsers: UserProfile[] = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    gender: 'Male',
    dateOfBirth: '1995-08-15',
    email: 'john@example.com',
    phone: '1234567890',
    profession: 'Software Engineer',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'active',
    createdAt: '2025-04-19T10:25:01.000Z',
    updatedAt: '2025-04-19T10:25:01.000Z',
    role: {
      id: 1,
      name: 'user',
    },
  },
  {
    id: 2,
    firstName: 'Jane',
    middleName: '',
    lastName: 'Smith',
    gender: 'Female',
    dateOfBirth: '1990-05-20',
    email: 'jane@example.com',
    phone: '9876543210',
    profession: 'Product Manager',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'active',
    createdAt: '2025-04-18T14:30:45.000Z',
    updatedAt: '2025-04-18T14:30:45.000Z',
    role: {
      id: 1,
      name: 'user',
    },
  },
  {
    id: 3,
    firstName: 'Robert',
    middleName: 'James',
    lastName: 'Johnson',
    gender: 'Male',
    dateOfBirth: '1988-11-12',
    email: 'robert@example.com',
    phone: '5551234567',
    profession: 'Data Analyst',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'inactive',
    createdAt: '2025-04-17T09:15:30.000Z',
    updatedAt: '2025-04-17T09:15:30.000Z',
    role: {
      id: 1,
      name: 'user',
    },
  },
];

// Sample data for technicians
const sampleTechnicians: UserProfile[] = [
  {
    id: 1,
    firstName: 'Amanuel',
    middleName: '',
    lastName: 'Isaay',
    gender: 'Male',
    dateOfBirth: '1992-03-25',
    email: 'amanuel@example.com',
    phone: '3334445555',
    profession: 'IT Support Specialist',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'active',
    createdAt: '2025-04-19T08:45:12.000Z',
    updatedAt: '2025-04-19T08:45:12.000Z',
    role: {
      id: 2,
      name: 'technician',
    },
  },
  {
    id: 2,
    firstName: 'Sarah',
    middleName: 'Elizabeth',
    lastName: 'Johnson',
    gender: 'Female',
    dateOfBirth: '1994-07-18',
    email: 'sarah@example.com',
    phone: '7778889999',
    profession: 'Hardware Specialist',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'active',
    createdAt: '2025-04-18T11:20:33.000Z',
    updatedAt: '2025-04-18T11:20:33.000Z',
    role: {
      id: 2,
      name: 'technician',
    },
  },
  {
    id: 3,
    firstName: 'Michael',
    middleName: '',
    lastName: 'Chen',
    gender: 'Male',
    dateOfBirth: '1991-09-05',
    email: 'michael@example.com',
    phone: '2223334444',
    profession: 'Network Engineer',
    profileImage: '/placeholder.svg?height=128&width=128',
    status: 'inactive',
    createdAt: '2025-04-17T15:10:45.000Z',
    updatedAt: '2025-04-17T15:10:45.000Z',
    role: {
      id: 2,
      name: 'technician',
    },
  },
];
export function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch real data using hooks
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useGetUsers(currentPage, itemsPerPage);
  const totalUsers = users.totalItems;

  const {
    data: technicians = [],
    isLoading: isLoadingTechnicians,
    refetch: refetchTechnicians,
  } = useGetTechnicians(currentPage, itemsPerPage);
  const totalTechnicians = technicians.totalCount;

  console.log('totalTechnicians:', totalTechnicians);

  const { mutateAsync: registerUser } = useRegistration();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const queryClient = useQueryClient();

  const isLoading = isLoadingUsers || isLoadingTechnicians;

  // Handle user selection
  const handleUserSelect = (user: UserProfile) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  // Handle adding a new user
  const handleAddUser = async (userData: UserFormData) => {
    registerUser(userData, {
      onSuccess: () => {
        toast.success('Registration successful');
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['technicians'] });
        setIsUserDialogOpen(false);
      },
      onError: error => {
        toast.error('Registration failed');
      },
    });
  };

  // Handle updating a user
  const handleUpdateUser = async (updatedUser: UserProfile) => {
    try {
      await updateUser({
        userId: updatedUser.id,
        payload: updatedUser,
      });

      // Invalidate and refetch the appropriate query
      await (updatedUser.role.id === 1
        ? queryClient.invalidateQueries({ queryKey: ['users'] })
        : queryClient.invalidateQueries({ queryKey: ['technicians'] }));

      toast.success('User updated successfully', {
        description: `${updatedUser.role.name === 'user' ? 'User' : 'Technician'} updated successfully.`,
      });

      setIsUserDialogOpen(false);
    } catch {
      toast.error('Failed to update user', {
        description: 'Please try again later.',
      });
    }
  };

  const handleDeleteUser = async (userId: number, roleId: number) => {
    try {
      await deleteUser(userId);

      // Invalidate and refetch the appropriate query
      await (roleId === 3
        ? queryClient.invalidateQueries({ queryKey: ['users'] })
        : queryClient.invalidateQueries({ queryKey: ['technicians'] }));

      toast.success('User deleted successfully', {
        description: `${roleId === 1 ? 'User' : 'Technician'} deleted successfully.`,
      });

      setIsUserDialogOpen(false);
    } catch {
      toast.error('Failed to delete user', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              User Management
            </h1>
            <p className="mt-2 text-slate-600">
              Manage users and technicians in the system
            </p>
          </div>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 bg-white md:w-1/4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="technicians"
              className="flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              <span>Technicians</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <UserTable
              users={users}
              isLoading={isLoadingUsers}
              onUserSelect={handleUserSelect}
              userType="user"
              currentPage={currentPage}
              totalItems={totalUsers}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </TabsContent>

          {/* Technicians Tab */}
          <TabsContent value="technicians" className="space-y-6">
            <UserTable
              users={technicians}
              isLoading={isLoadingTechnicians}
              onUserSelect={handleUserSelect}
              userType="technician"
              currentPage={currentPage}
              totalItems={totalTechnicians}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* User Detail Dialog */}
      {selectedUser && (
        <UserDialog
          user={selectedUser}
          open={isUserDialogOpen}
          onOpenChange={setIsUserDialogOpen}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Add User Dialog */}
      <AddUserDialog
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onSubmit={handleAddUser}
        defaultRole={activeTab === 'users' ? 1 : 2}
      />
    </div>
  );
}
