import { z } from 'zod';

export const requestFormSchema = z.object({
  faculty: z.string().min(1, 'Faculty is required'),
  department: z.string().min(1, 'Department is required'),
  phone: z.string().min(1, 'Phone number is required'),
  block: z.string().min(1, 'Block is required'),
  office: z.string().min(1, 'Office is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  model: z.string().min(1, 'Model is required'),
  description: z.string().min(1, 'Description is required'),
});

export type RequestInputs = z.infer<typeof requestFormSchema>;
