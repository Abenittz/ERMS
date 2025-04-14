'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, Search } from 'lucide-react';

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

export function UserTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Mobile');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<string | null>('5'); // Default to the 5th row as shown in the image

  // Filter users based on selected category and search query
  const filteredUsers = users.filter(user => {
    const matchesCategory =
      selectedCategory === 'All' || user.category === selectedCategory;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full rounded-lg bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white py-2 pr-4 pl-10 sm:w-[250px]"
          />
        </div>
      </div>

      <div className="w-full overflow-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[200px] font-medium">Name</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Availability</TableHead>
              <TableHead className="font-medium">Date of birth</TableHead>
              <TableHead className="font-medium">Phone</TableHead>
              <TableHead className="font-medium">Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow
                key={user.id}
                className={
                  selectedRow === user.id ? 'border-background border-2' : ''
                }
                onClick={() => setSelectedRow(user.id)}
              >
                <TableCell className="flex items-center gap-3 py-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user.avatarUrl || '/placeholder.svg'}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-primary font-medium">{user.name}</span>
                </TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                </TableCell>
                <TableCell>{user.dateOfBirth}</TableCell>
                <TableCell>{user.phone}</TableCell>
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
