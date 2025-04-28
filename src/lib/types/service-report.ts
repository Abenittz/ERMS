export interface TestResult {
  test: string;
  result: string;
}

export interface ServiceReport {
  repairRequestId: number;
  assignedTo: number;
  status: string;
  serviceDate: string;
  technicianComments: string;
  servicePerformed: string;
  partsUsed: string;
  finalReadings: string;
  resultRating: string;
  testResults: TestResult[];
  feedbackRating: number;
  feedbackComments: string;
}

export interface Assignee {
  firstName: string;
  lastName: string;
}

export interface ServiceReportResponse {
  id: number;
  repairRequestId: number;
  assignedTo: number;
  status: string;
  serviceDate: string; // ISO date string
  technicianComments: string;
  servicePerformed: string;
  partsUsed: string;
  finalReadings: string;
  resultRating: string;
  testResults: string; // JSON string of TestResult[]
  feedbackRating: number;
  feedbackComments: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string or null
  assignee: Assignee;
}
