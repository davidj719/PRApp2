// ProjectTypeListScreen.tsx
import React from 'react';
import SimpleListScreen from '../components/SimpleListScreen';
import { ProjectType } from './types';

export default function ProjectTypeListScreen() {
  return (
    <SimpleListScreen<ProjectType>
      title="Project Types"
      table="project_types"
      navigateTo="ProjectTypeFormScreen"
      extractName={(item) => item.name}
    />
  );
}
  