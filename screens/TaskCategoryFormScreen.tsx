// TaskCategoryFormScreen.tsx
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import SimpleFormScreen from '../components/SimpleFormScreen';
import { TaskCategory, AppStackParamList } from './types';

type RouteProps = RouteProp<AppStackParamList, 'TaskCategoryFormScreen'>;

export default function TaskCategoryFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const existingItem = route.params?.item;

  return (
    <SimpleFormScreen<TaskCategory>
      title={existingItem ? 'Edit Task Category' : 'New Task Category'}
      table="task_categories"
      item={existingItem}
      onSaveSuccess={() => navigation.goBack()}
    />
  );
}
