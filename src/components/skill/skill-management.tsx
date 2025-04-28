'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useAddSkill,
  useAssignSkill,
  useDeleteTechnicianSkill,
  useGetSkills,
  useGetTechniciansSkills,
} from '@/hooks/admin/skill-management';
import { useGetTechnicians } from '@/hooks/admin/use-get-users';
import { UserProfile } from '@/store/user-store';

import { AddSkillForm } from './add-skill-form';
import { SkillAssignment } from './skill-assigment';
import { SkillsList } from './skill-list';
import { TechnicianSkillMatrix } from './technician-skill-matrix';

interface Technician {
  id: number;
  firstName: string;
  lastName: string;
}

interface Skill {
  id: number;
  name: string;
}

interface TechnicianSkill {
  id: number;
  userId: number;
  skillId: number;
  technician: Technician;
  skill: Skill;
}

interface Skills {
  id: number;
  name: string;
}
// Sample data for skills
const sampleSkills = [
  { id: 1, name: 'Hardware Repair' },
  { id: 2, name: 'Software Maintenance' },
  { id: 3, name: 'Network Troubleshooting' },
  { id: 4, name: 'Data Recovery' },
  { id: 5, name: 'Mobile Device Repair' },
];

// Sample data for technicians
const sampleTechnicians = [
  {
    id: 1,
    name: 'William Kim',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'IT Support',
  },
  {
    id: 2,
    name: 'Isabella Nguyen',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Hardware Support',
  },
  {
    id: 3,
    name: 'Carlos Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Software Support',
  },
  {
    id: 4,
    name: 'Sofia Davis',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Network Support',
  },
  {
    id: 5,
    name: 'Olivia Marti',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Mobile Support',
  },
];

// Sample data for technician skills
const sampleTechnicianSkills = [
  { userId: 1, skillId: 1 },
  { userId: 1, skillId: 3 },
  { userId: 2, skillId: 2 },
  { userId: 2, skillId: 4 },
  { userId: 3, skillId: 2 },
  { userId: 3, skillId: 5 },
  { userId: 4, skillId: 3 },
  { userId: 5, skillId: 5 },
];
export function SkillManagement() {
  // Fetch all necessary data
  const {
    data: skillsData = [],
    isLoading: skillsLoading,
    refetch: refetchSkills,
  } = useGetSkills();

  const { data: techniciansData = [], isLoading: techniciansLoading } =
    useGetTechnicians();

  const {
    data: technicianSkillData = [],
    isLoading: technicianSkillLoading,
    refetch: refetchTechnicianSkills,
  } = useGetTechniciansSkills();

  // Mutation hooks
  const { mutateAsync: addSkillMutation, isPending: isAddingSkill } =
    useAddSkill();
  const {
    mutateAsync: deleteTechnicianSkillMutation,
    isPending: isDeletingSkill,
  } = useDeleteTechnicianSkill();
  const { mutateAsync: assignSkillMutation, isPending: isAssigningSkill } =
    useAssignSkill();

  // Combined loading state
  const isLoading =
    skillsLoading ||
    techniciansLoading ||
    technicianSkillLoading ||
    isAddingSkill ||
    isDeletingSkill;

  // Add a new skill
  const addSkill = async (skillName: string) => {
    try {
      await addSkillMutation(skillName);
      await refetchSkills();

      toast.success('Skill Added', {
        description: `"${skillName}" has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Error', {
        description: 'Failed to add skill. Please try again.',
      });
    }
  };

  // Assign skill to technician
  const assignSkill = async (userId: number, skillId: number) => {
    try {
      // Check if assignment already exists
      const exists = technicianSkillData.some(
        (ts: TechnicianSkill) => ts.userId === userId && ts.skillId === skillId,
      );

      if (exists) {
        toast.info('Already Assigned', {
          description: 'This skill is already assigned to the technician.',
        });
        return;
      }

      await assignSkillMutation({
        userId: userId,
        skillId: skillId,
      });
      await refetchTechnicianSkills();

      // Get skill and technician names for the toast
      const skill = skillsData.find((s: Skills) => s.id === skillId);
      const technician = techniciansData.find(
        (t: UserProfile) => t.id === userId,
      );

      toast.success('Skill Assigned', {
        description: `"${skill?.name}" has been assigned to ${technician?.firstName} ${technician?.lastName}.`,
      });
    } catch (error) {
      console.error('Error assigning skill:', error);
      toast.error('Error', {
        description: 'Failed to assign skill. Please try again.',
      });
    }
  };

  // Remove skill assignment
  const removeSkillAssignment = async (userId: number, skillId: number) => {
    try {
      // Find the assignment ID (you might need to adjust this based on your actual data structure)
      const assignment = technicianSkillData.find(
        (ts: TechnicianSkill) => ts.userId === userId && ts.skillId === skillId,
      );

      if (!assignment) {
        toast.error('Error', {
          description: 'Assignment not found.',
        });
        return;
      }

      await deleteTechnicianSkillMutation(assignment.id);
      await refetchTechnicianSkills();

      // Get skill and technician names for the toast
      const skill = skillsData.find((s: Skills) => s.id === skillId);
      const technician = techniciansData.find(
        (t: UserProfile) => t.id === userId,
      );

      toast.success('Skill Removed', {
        description: `"${skill?.name}" has been removed from ${technician?.firstName} ${technician?.lastName}.`,
      });
    } catch (error) {
      console.error('Error removing skill assignment:', error);
      toast.error('Error', {
        description: 'Failed to remove skill assignment. Please try again.',
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Technician Skill Management
          </h1>
          <p className="mt-2 text-slate-600">
            Add skills and assign them to technicians
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 bg-white pb-2">
            <TabsTrigger value="skills">Skills Management</TabsTrigger>
            <TabsTrigger value="assignment">Skill Assignment</TabsTrigger>
            <TabsTrigger value="matrix">Skill Matrix</TabsTrigger>
          </TabsList>

          {/* Skills Management Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Add Skill Form */}
              <div className="md:col-span-1">
                <AddSkillForm onAddSkill={addSkill} isLoading={isLoading} />
              </div>

              {/* Skills List */}
              <div className="md:col-span-2">
                <SkillsList skills={skillsData} />
              </div>
            </div>
          </TabsContent>

          {/* Skill Assignment Tab */}
          <TabsContent value="assignment" className="space-y-6">
            <SkillAssignment
              skills={skillsData}
              technicians={techniciansData}
              technicianSkills={technicianSkillData}
              onAssignSkill={assignSkill}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* Skill Matrix Tab */}
          <TabsContent value="matrix" className="space-y-6">
            <TechnicianSkillMatrix
              skills={skillsData}
              technicians={techniciansData}
              technicianSkills={technicianSkillData}
              onRemoveSkill={removeSkillAssignment}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
