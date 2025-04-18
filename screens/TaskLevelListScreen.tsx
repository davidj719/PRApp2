// TaskLevelListScreen.tsx
import React from 'react';
import { UniversalListScreen } from '../components/UniversalListScreen';

export default function TaskLevelListScreen() {
  return (
    <UniversalListScreen
      title="Task Levels"
      table="task_levels"
      formScreen="TaskLevelFormScreen"
    />
  );
}
