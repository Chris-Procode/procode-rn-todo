export interface Todo {
  createdAt: number;
  completedAt?: number;
  archivedAt?: number;

  id: string;
  title: string;
  description?: string;
}
