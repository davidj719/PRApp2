// EmployeeFormScreen.tsx
import React from 'react';
import { UniversalFormScreen } from '../components/UniversalFormScreen';

export default function EmployeeFormScreen() {
  return (
    <UniversalFormScreen
      title="Employee"
      table="employees"
      fields={[
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'level', label: 'Level', type: 'text' },
        { name: 'hourly_wage', label: 'Hourly Wage', type: 'text' },
        { name: 'is_active', label: 'Status', type: 'text' }, // Switch support coming later
      ]}
    />
  );
}