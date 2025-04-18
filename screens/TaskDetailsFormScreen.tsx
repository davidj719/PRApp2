// TaskDetailsFormScreen.tsx
import React from 'react';
import { UniversalFormScreen } from '../components/UniversalFormScreen';

export default function TaskDetailsFormScreen() {
  return (
    <UniversalFormScreen
      title="Task Details"
      table="tasks"
      fields={[
        { name: 'task_category_id', label: 'Task Category', type: 'dropdown', table: 'task_categories', labelField: 'name' },
        { name: 'name', label: 'Task Name', type: 'text' },
        { name: 'description', label: 'Task Description', type: 'text' },
        { name: 'billed_price', label: 'Task Billed Price', type: 'text' },
        { name: 'employee_payout_price', label: 'Task Employee Payout Price', type: 'text' },
        { name: 'task_level_id', label: 'Task Level', type: 'dropdown', table: 'task_levels', labelField: 'name' },
        { name: 'how_to_url', label: 'How To', type: 'text' },
        { name: 'is_active', label: 'Active', type: 'text' },
      ]}
    />
  );
}
