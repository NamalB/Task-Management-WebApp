import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TaskFormData } from '../../types';

interface TaskFormProps {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  isSubmitting?: boolean;
}

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

const TaskForm: React.FC<TaskFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData.title || '',
    description: initialData.description || '',
    deadline: initialData.deadline || new Date(),
    assignedTo: initialData.assignedTo || '',
    status: initialData.status || 'Pending',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned To is required';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, deadline: date || new Date() }));
    
    // Clear error when date is changed
    if (errors.deadline) {
      setErrors((prev) => ({ ...prev, deadline: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="title"
        name="title"
        label="Title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />

      <TextArea
        id="description"
        name="description"
        label="Description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        rows={4}
        required
      />

      <div className="mb-4">
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
          Deadline
        </label>
        <DatePicker
          id="deadline"
          selected={formData.deadline}
          onChange={handleDateChange}
          className={`w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            errors.deadline ? 'border-red-500' : 'border-gray-300'
          }`}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
        />
        {errors.deadline && <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>}
      </div>

      <Input
        id="assignedTo"
        name="assignedTo"
        label="Assigned To"
        placeholder="Name of the assignee"
        value={formData.assignedTo}
        onChange={handleChange}
        error={errors.assignedTo}
        required
      />

      <Select
        id="status"
        name="status"
        label="Status"
        value={formData.status}
        onChange={handleChange}
        options={statusOptions}
        error={errors.status}
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {initialData.title ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;