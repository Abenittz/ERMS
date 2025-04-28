import { z } from 'zod';

export const requestFormSchema = z.object({
  userId: z.number().min(1, 'User ID is required'),
  requestNumber: z.string().min(1, 'Request number is required'),
  requestDate: z.string().optional(), // We'll add this automatically
  department: z.string().min(1, 'Department is required'),
  requesterName: z.string().min(1, 'Requester name is required'),
  contactPhone: z.string().min(10, 'Contact phone is required'),
  deviceName: z.string().min(1, 'Device name is required'),
  deviceModel: z.string().min(1, 'Device model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  assetNumber: z.string().min(1, 'Asset number is required'),
  buildingBlockNumber: z.string().min(1, 'Block number is required'),
  officeNumber: z.string().min(1, 'Office number is required'),
  problemDescription: z.string().min(1, 'Problem description is required'),
  priority: z.enum(['Low', 'Medium', 'High']),
});

export type RequestInputs = z.infer<typeof requestFormSchema>;
