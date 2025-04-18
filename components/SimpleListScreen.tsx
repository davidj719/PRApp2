// components/SimpleListScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Pressable } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../app/supabase';

type Props<T> = {
  title: string;
  table: string;
  navigateTo: string;
  extractName: (item: T) => string;
};

export default function SimpleListScreen<T extends { id: string }>({
  title,
  table,
  navigateTo,
  extractName,
}: Props<T>) {
  const [records, setRecords] = useState<T[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title });
      fetchData();
    }, [])
  );

  

const fetchData = async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('name');

    if (!error && data) setRecords(data as T[]);
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => navigation.navigate(navigateTo, { item })}
          >
            <Text style={globalStyles.title}>{extractName(item)}</Text>
          </TouchableOpacity>
        )}
      />
      <Pressable
        style={globalStyles.fab}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </View>
  );
}
