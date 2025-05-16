export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Done';
  createdAt: Date;
  updatedAt: Date;
};

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type TaskFilter = {
  search: string;
  status: string;
  sortBy: 'deadline' | 'title' | 'status';
  sortOrder: 'asc' | 'desc';
};