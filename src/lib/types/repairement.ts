export interface RepairRequestPayload {
  requestNumber: string;
  requestDate: string;
  department: string;
  requesterName: string;
  contactPhone: string;
  deviceName: string;
  deviceModel: string;
  serialNumber: string;
  assetNumber: string;
  problemDescription: string;
  priority: string;
}

export interface RepairRequestResponse {
  id: number;
  requestNumber: string;
  requestDate: string; // ISO date string
  department: string;
  requesterName: string;
  contactPhone: string;
  deviceName: string;
  deviceModel: string;
  serialNumber: string;
  assetNumber: string;
  problemDescription: string;
  priority: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string or null
}
