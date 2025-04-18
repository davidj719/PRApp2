// App.tsx
import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BuilderListScreen from './screens/BuilderListScreen';
import BuilderFormScreen from './screens/BuilderFormScreen';
import AddressScreen from './screens/AddressListScreen';
import AddressFormScreen from './screens/AddressFormScreen';
import ProjectTypeListScreen from './screens/ProjectTypeListScreen';
import ProjectTypeFormScreen from './screens/ProjectTypeFormScreen';
import EmployeeListScreen from './screens/EmployeeListScreen';
import EmployeeFormScreen from './screens/EmployeeFormScreen';
import ProjectStatusListScreen from './screens/ProjectStatusListScreen';
import ProjectStatusFormScreen from './screens/ProjectStatusFormScreen';
import { AppStackParamList } from './screens/types';
import TaskDetailsListScreen from './screens/TaskDetailsListScreen';
import TaskDetailsFormScreen from './screens/TaskDetailsFormScreen';
import TaskCategoryListScreen from './screens/TaskCategoryListScreen';
import TaskCategoryFormScreen from './screens/TaskCategoryFormScreen';
import TaskLevelListScreen from './screens/TaskLevelListScreen';
import TaskLevelFormScreen from './screens/TaskLevelFormScreen';
import { ListSettingsProvider } from './components/ListSettingsContext';

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <ListSettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="BuilderListScreen" component={BuilderListScreen} options={{ title: 'Builder List' }} />
          <Stack.Screen name="BuilderFormScreen" component={BuilderFormScreen} options={{ title: 'Builder Form' }} />
          <Stack.Screen name="AddressListScreen" component={AddressScreen} options={{ title: 'Address List' }} />
          <Stack.Screen name="AddressFormScreen" component={AddressFormScreen} options={{ title: 'Address Form' }} />
          <Stack.Screen name="ProjectTypeListScreen" component={ProjectTypeListScreen} options={{ title: 'Project Type List' }} />
          <Stack.Screen name="ProjectTypeFormScreen" component={ProjectTypeFormScreen} options={{ title: 'Project Type Form' }} />
          <Stack.Screen name="Employee" component={EmployeeListScreen} options={{ title: 'Employee List' }} />
          <Stack.Screen name="EmployeeForm" component={EmployeeFormScreen} options={{ title: 'Employee Form' }} />
          <Stack.Screen name="ProjectStatusListScreen" component={ProjectStatusListScreen} options={{ title: 'Project Status List' }} />
          <Stack.Screen name="ProjectStatusFormScreen" component={ProjectStatusFormScreen} options={{ title: 'Project Status Form' }} />
          <Stack.Screen name="TaskCategoryListScreen" component={TaskCategoryListScreen} options={{ title: 'Task Category List' }} />
          <Stack.Screen name="TaskCategoryFormScreen" component={TaskCategoryFormScreen} options={{ title: 'Task Category Form' }} />
          <Stack.Screen name="TaskLevelListScreen" component={TaskLevelListScreen} options={{ title: 'Task Level List' }} />
          <Stack.Screen name="TaskDetailsListScreen" component={TaskDetailsListScreen} options={{ title: 'Task Details List' }} />
          <Stack.Screen name="TaskLevelFormScreen" component={TaskLevelFormScreen} options={{ title: 'Task Level Form' }} />
          <Stack.Screen name="TaskDetailsFormScreen" component={TaskDetailsFormScreen} options={{ title: 'Task Details Form' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ListSettingsProvider>
  );
}
