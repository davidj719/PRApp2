// ProjectTypeFormScreen.tsx
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import SimpleFormScreen from '../components/SimpleFormScreen';
import { ProjectType, AppStackParamList } from './types';

type RouteProps = RouteProp<AppStackParamList, 'ProjectTypeFormScreen'>;

export default function ProjectTypeFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const existingItem = route.params?.item;

  return (
    <SimpleFormScreen<ProjectType>
      title={existingItem ? 'Edit Project Type' : 'New Project Type'}
      table="project_types"
      item={existingItem}
      onSaveSuccess={() => navigation.goBack()}
    />
  );
}
