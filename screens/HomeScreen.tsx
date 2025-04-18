// HomeScreen.tsx

import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from './types';
import { globalStyles } from '../styles/global';

type HomeScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={[globalStyles.container, { justifyContent: 'center', gap: 20 }]}>  
      <Button title="Manage Builders" onPress={() => navigation.navigate('BuilderListScreen')} />
      <Button title="Manage Project Addresses" onPress={() => navigation.navigate('AddressListScreen')} />
      <Button title="Manage Project Types" onPress={() => navigation.navigate('ProjectTypeListScreen')} />
      <Button title="Manage Employees" onPress={() => navigation.navigate('Employee')} />
      <Button title="Manage Project Status" onPress={() => navigation.navigate('ProjectStatusListScreen')} />
      <Button title="Manage Task Categories" onPress={() => navigation.navigate('TaskCategoryListScreen')} />
      <Button title="Manage Task Levels" onPress={() => navigation.navigate('TaskLevelListScreen')} />
      <Button title="Manage Task Details" onPress={() => navigation.navigate('TaskDetailsListScreen')} />
    </View>
  );
}
