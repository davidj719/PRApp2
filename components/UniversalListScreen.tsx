// UniversalListScreen.tsx

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../app/supabase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../screens/types';
import { globalStyles } from '../styles/global';
import { useListSettings } from './ListSettingsContext';

// Filter routes to only those that accept undefined or { id?: string }
type RoutesWithOptionalId = {
  [K in keyof AppStackParamList]: undefined extends AppStackParamList[K]
    ? K
    : { id?: string } extends AppStackParamList[K]
    ? K
    : never;
}[keyof AppStackParamList];

interface UniversalListScreenProps<T = any> {
  fieldLabels?: Record<string, string>;
  title: string;
  table: string;
  fields?: string[]; // Default: ['name', 'description']
  formScreen: RoutesWithOptionalId;
  customRenderItem?: ({ item }: { item: T }) => JSX.Element;
  filterFn?: (data: T[]) => T[];
  sortBy?: string;
  groupBy?: string;
}

function deepMatch(obj: any, keyword: string): boolean {
  if (obj === null || obj === undefined) return false;
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString().toLowerCase().includes(keyword);
  }
  if (Array.isArray(obj)) {
    return obj.some((item) => deepMatch(item, keyword));
  }
  if (typeof obj === 'object') {
    return Object.entries(obj).some(([key, value]) => key !== 'id' && deepMatch(value, keyword));
  }
  return false;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((o, key) => (o ? o[key] : ''), obj);
}

export function UniversalListScreen<T extends { id: string }>({
  title,
  table,
  fields = ['name', 'description'],
  formScreen,
  customRenderItem,
  filterFn,
  sortBy,
  groupBy,
  fieldLabels = {}
}: UniversalListScreenProps<T>) {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [originalData, setOriginalData] = useState<T[]>([]);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const { settings, setSort } = useListSettings();
  const screenKey = title;
  const selectedSortField = settings[screenKey]?.sortField || null;
  const sortDirection = settings[screenKey]?.sortDirection || 'asc';

  useEffect(() => {
    supabase.from(table).select('*, task_categories(name), task_levels(name)')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        const typedData = data as unknown as T[];
        let result = typedData || [];
        if (filterFn) result = filterFn(result);

        setOriginalData(result);
        setData(result);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Normalize fields: string[] or { name, label }[]
    const resolvedFields: string[] = Array.isArray(fields) && typeof fields[0] === 'object'
      ? (fields as any[]).map((f) => f.name)
      : (fields as string[]);
  
    const resolvedLabels: Record<string, string> = Array.isArray(fields) && typeof fields[0] === 'object'
      ? Object.fromEntries((fields as any[]).map((f) => [f.name, f.label || f.name]))
      : fieldLabels || {};
  
    // Filter and sort the data
    let result = [...originalData];
  
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((item) => deepMatch(item, lowerSearch));
    }
  
    if (selectedSortField) {
      result.sort((a, b) => {
        const valA = getNestedValue(a, selectedSortField)?.toString().toLowerCase() || '';
        const valB = getNestedValue(b, selectedSortField)?.toString().toLowerCase() || '';
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }
  
    setData(result);
  }, [search, selectedSortField, sortDirection, originalData]);





  const defaultRender = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate(formScreen as any, { id: item.id })}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>{getNestedValue(item, fields[0])}</Text>
        {resolvedFields[1] && (
          <Text style={globalStyles.subtitle}>{getNestedValue(item, fields[1])}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;

  return (
    <View style={[globalStyles.container, { flex: 1 }]}> 
      <Text style={globalStyles.title}>{title}</Text>
      {showSearchBar && (
        <TextInput
          ref={searchInputRef}
          style={globalStyles.input}
          placeholder={`Search ${fields[0]}`}
          value={search}
          onChangeText={setSearch}
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (customRenderItem || defaultRender)({ item })}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff'
      }}>
        <TouchableOpacity onPress={() => {
          setShowSearchBar((prev) => {
            const next = !prev;
            if (next) setTimeout(() => searchInputRef.current?.focus(), 100);
            return next;
          });
        }}>
          <Ionicons name="search" size={24} color="#4F46E5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setShowSearchBar(true);
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#4F46E5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(formScreen as any)}>
          <Ionicons name="add" size={32} color="#4F46E5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortModalVisible(true)}>
          <MaterialCommunityIcons name="sort" size={24} color="#4F46E5" />
        </TouchableOpacity>

        <Text style={{ fontSize: 16 }}>Total: {data.length}</Text>
      </View>

      <Modal
        visible={sortModalVisible}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
        transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20, paddingTop: 60 }}>
          <Text style={[globalStyles.title, { marginBottom: 20 }]}>Sort</Text>
          <Text style={globalStyles.subtitle}>Choose a field</Text>

          {fields.map((field) => {
            const label = fieldLabels[field] || (field.includes('.') ? field.split('.').slice(-1)[0] : field);
            return (
              <TouchableOpacity
                key={field}
                onPress={() => {
                  setSort(screenKey, field, sortDirection);
                  setSortModalVisible(false);
                }}
                style={globalStyles.card}>
                <Text style={globalStyles.title}>{label}</Text>
              </TouchableOpacity>
            );
          })}

          <Text style={[globalStyles.subtitle, { marginTop: 20 }]}>Direction</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <Button title="Ascending" onPress={() => setSort(screenKey, selectedSortField || '', 'asc')} />
            <Button title="Descending" onPress={() => setSort(screenKey, selectedSortField || '', 'desc')} />
          </View>

          <Pressable onPress={() => setSortModalVisible(false)}>
            <Text style={{ marginTop: 16, textAlign: 'center', color: '#4F46E5' }}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
