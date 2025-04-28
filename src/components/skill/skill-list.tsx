'use client';

import { Wrench } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Skill {
  id: number;
  name: string;
}

interface SkillsListProps {
  skills: Skill[];
}

export function SkillsList({ skills }: SkillsListProps) {
  console.log('SkillsList', skills);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Skills</CardTitle>
        <CardDescription>
          List of all skills that can be assigned to technicians
        </CardDescription>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-3">
              <Wrench className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium">No skills available</h3>
            <p className="mt-1 text-sm text-slate-500">
              Add skills using the form on the left.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {skills.map(skill => (
              <div
                key={skill.id}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50"
              >
                <div className="rounded-full bg-indigo-100 p-2">
                  <Wrench className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{skill.name}</p>
                </div>
                <Badge variant="outline">ID: {skill.id}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
