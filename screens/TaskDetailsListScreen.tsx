// TaskDetailsListScreen.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UniversalListScreen } from '../components/UniversalListScreen';
import { AppStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

interface Task {
  id: string;
  name: string;
  task_categories?: {
    name?: string;
  };
}

export default function TaskDetailsListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <UniversalListScreen<Task>
      title="Task Details"
      table="tasks"
      formScreen="TaskDetailsFormScreen"
      fields={['id', 'name', 'task_categories(name)']}
      customRenderItem={({ item }) => (
        <TouchableOpacity
          style={globalStyles.card}
          onPress={() => navigation.navigate('TaskDetailsFormScreen', { id: item.id })}
        >
          <Text style={globalStyles.title}>{item.name}</Text>
          <Text style={globalStyles.subtitle}>
            {item.task_categories?.name ?? 'Uncategorized'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
