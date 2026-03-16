export const STATUSES = ["Open", "Closed", "In Progress", "Blocked", "Done"] as const;

export const STATUS_COLORS: Record<string, string> = {
  "Open":        "#2563eb",
  "Closed":      "#6b7280",
  "In Progress": "#d97706",
  "Blocked":     "#dc2626",
  "Done":        "#16a34a",
};

export default interface WorkItem {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export type WorkItemFormData = {
  title: string;
  description: string;
  status: string;
};

export type FormErrors = {
  title?: string;
  description?: string;
};
