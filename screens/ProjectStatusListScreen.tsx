// ProjectStatusListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../app/supabase';
import { ProjectStatus, AppStackParamList } from './types';
import { globalStyles } from '../styles/global';
import { Pressable } from 'react-native';


type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'ProjectStatusListScreen'>;

const ProjectStatusListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    if (isFocused) {
      loadProjects();
    }
  }, [isFocused]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('project_status')
      .select(`
        id,
        is_active,
        addresses (address_line1),
        project_types (name),
        builders (name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => navigation.navigate('ProjectStatusFormScreen', { id: item.id })}
    >
      <Text style={globalStyles.title}>{item.addresses?.address_line1 || 'No Address'}</Text>
      <Text style={globalStyles.subtitle}>
        {item.project_types?.name || 'No Type'} • {item.builders?.name || 'No Builder'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

<Pressable
  style={globalStyles.fab}
  onPress={() => navigation.navigate('ProjectStatusFormScreen')}
>
  <Text style={{ color: 'white', fontSize: 24 }}>＋</Text>
</Pressable>
      
    </View>
  );
};

export default ProjectStatusListScreen;
