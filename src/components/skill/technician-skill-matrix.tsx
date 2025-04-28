'use client';

import { CheckCircle, Loader2, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

interface TechnicianSkillMatrixProps {
  skills: Skill[];
  technicians: UserProfile[];
  technicianSkills: TechnicianSkill[];
  onRemoveSkill: (userId: number, skillId: number) => void;
  isLoading: boolean;
}

export function TechnicianSkillMatrix({
  skills,
  technicians,
  technicianSkills,
  onRemoveSkill,
  isLoading,
}: Readonly<TechnicianSkillMatrixProps>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [removingSkill, setRemovingSkill] = useState<{
    userId: number;
    skillId: number;
  } | null>(null);

  // Check if a technician has a specific skill
  const hasSkill = (userId: number, skillId: number) => {
    return technicianSkills.some(
      ts => ts.userId === userId && ts.skillId === skillId,
    );
  };

  // Handle skill removal
  const handleRemoveSkill = async (userId: number, skillId: number) => {
    setRemovingSkill({ userId, skillId });
    await onRemoveSkill(userId, skillId);
    setRemovingSkill(null);
  };

  // Filter technicians based on search term
  const filteredTechnicians = technicians.filter(technician =>
    technician.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Technician Skill Matrix</CardTitle>
            <CardDescription>
              Overview of skills assigned to each technician
            </CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search technicians..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Technician</TableHead>
                {skills.map(skill => (
                  <TableHead key={skill.id} className="text-center">
                    {skill.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnicians.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={skills.length + 1}
                    className="h-24 text-center"
                  >
                    No technicians found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTechnicians.map(technician => (
                  <TableRow key={technician.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={technician.profileImage || '/placeholder.svg'}
                            alt={technician.firstName}
                          />
                          <AvatarFallback>
                            {technician.firstName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{technician.firstName}</div>
                          <div className="text-muted-foreground text-xs">
                            {technician.profession}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    {skills.map(skill => (
                      <TableCell key={skill.id} className="text-center">
                        {hasSkill(technician.id, skill.id) ? (
                          <div className="flex flex-col items-center">
                            <Badge
                              variant="outline"
                              className="mb-1 bg-green-50 text-green-700"
                            >
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Assigned
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() =>
                                handleRemoveSkill(technician.id, skill.id)
                              }
                              disabled={
                                isLoading ||
                                (removingSkill?.userId === technician.id &&
                                  removingSkill?.skillId === skill.id)
                              }
                            >
                              {removingSkill?.userId === technician.id &&
                              removingSkill?.skillId === skill.id ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            -
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
