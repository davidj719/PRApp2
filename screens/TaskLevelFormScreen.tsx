// TaskLevelFormScreen.tsx
import React from 'react';
import { UniversalFormScreen } from '../components/UniversalFormScreen';

export default function TaskLevelFormScreen() {
  return (
    <UniversalFormScreen
      title="Task Level"
      table="task_levels"
      fields={['name', 'description']}
    />
  );
}