'use client';

import { ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Define the User type
type User = {
  id: string;
  name: string;
  category: string;
  available: boolean;
  dateOfBirth: string;
  phone: string;
  avatarUrl: string;
};

// Sample data
const users: User[] = [
  {
    id: '1',
    name: 'Eden Yilma',
    category: 'Mobile',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    name: 'Tariku bekele',
    category: 'PC',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '3',
    name: 'Alemayehu sintayehu',
    category: 'Mobile',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '4',
    name: 'Amanuel sisay',
    category: 'Laptop',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '5',
    name: 'Eden Yilma',
    category: 'Computer',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '6',
    name: 'Eden Yilma',
    category: 'Mobile',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '7',
    name: 'Eden Yilma',
    category: 'Mobile',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '8',
    name: 'Eden Yilma',
    category: 'Mobile',
    available: true,
    dateOfBirth: '02/05/2001',
    phone: '+09 6988567',
    avatarUrl: '/placeholder.svg?height=40&width=40',
  },
];

// Available categories for filtering
const categories = ['All', 'Mobile', 'PC', 'Laptop', 'Computer'];
import { useGetTechnicians } from '@/hooks/admin/use-get-users';
import { UserProfile } from '@/store/user-store';

export function UserTable() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Fetch technicians data
  const { data: technicians = [], isLoading, isError } = useGetTechnicians();

  // Filter technicians based on search query
  const filteredTechnicians = technicians.filter((technician: UserProfile) => {
    const matchesSearch =
      `${technician.firstName} ${technician.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      technician.phone.includes(searchQuery) ||
      technician.profession.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (isLoading) return <div>Loading technicians...</div>;
  if (isError) return <div>Error loading technicians</div>;

  return (
    <div className="w-full rounded-lg bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, phone or profession"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            className="w-full bg-white py-2 pr-4 pl-10 sm:w-[250px]"
          />
        </div>
      </div>

      <div className="w-full overflow-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[200px] font-medium">Name</TableHead>
              <TableHead className="font-medium">Profession</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Date of birth</TableHead>
              <TableHead className="font-medium">Phone</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTechnicians.map((technician: UserProfile) => (
              <TableRow
                key={technician.id}
                className={
                  selectedRow === technician.id
                    ? 'border-background border-2'
                    : ''
                }
                onClick={() => setSelectedRow(technician.id)}
              >
                <TableCell className="flex items-center gap-3 py-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={technician.profileImage || '/placeholder.svg'}
                      alt={`${technician.firstName} ${technician.lastName}`}
                    />
                    <AvatarFallback>
                      {technician.firstName.charAt(0)}
                      {technician.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-primary font-medium">
                    {technician.firstName}{' '}
                    {technician.middleName && `${technician.middleName} `}
                  </span>
                </TableCell>
                <TableCell>{technician.profession}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        technician.status === 'active'
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`}
                    ></span>
                    <span
                      className={`text-sm ${
                        technician.status === 'active'
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {technician.status === 'active'
                        ? 'Available'
                        : 'Unavailable'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(technician.dateOfBirth).toLocaleDateString()}
                </TableCell>
                <TableCell>{technician.phone}</TableCell>
                <TableCell>{technician.email}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-primary hover:bg-primary/90 h-8 w-8 rounded-lg text-white hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
