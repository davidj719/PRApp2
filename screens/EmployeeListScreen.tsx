import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UniversalListScreen } from '../components/UniversalListScreen';
import { AppStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

export default function EmployeeListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <UniversalListScreen<Employee>
      title="Employees"
      table="employees"
      formScreen="EmployeeForm"
      fields={['first_name', 'last_name']}
      customRenderItem={({ item }) => (
        <TouchableOpacity
          style={globalStyles.card}
          onPress={() => navigation.navigate('EmployeeForm', { id: item.id })}
        >
          <Text style={globalStyles.title}>{item.first_name} {item.last_name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
