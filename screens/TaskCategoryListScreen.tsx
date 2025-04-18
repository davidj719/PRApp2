// TaskCategoryListScreen.tsx
import React from 'react';
import { UniversalListScreen } from '../components/UniversalListScreen';

export default function TaskCategoryListScreen() {
  return (
    <UniversalListScreen
      title="Task Categories"
      table="task_categories"
      formScreen="TaskCategoryFormScreen"
    />
  );
}
