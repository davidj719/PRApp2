// components/SimpleFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { supabase } from '../app/supabase';

interface BaseItem {
  id?: string;
  name?: string;
  description?: string;
  is_active?: boolean;
}

interface SimpleFormProps<T extends BaseItem> {
  title: string;
  table: string;
  item?: T;
  onSaveSuccess: () => void;
}

export default function SimpleFormScreen<T extends BaseItem>(
  { title, table, item, onSaveSuccess }: SimpleFormProps<T>
) {
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [isActive, setIsActive] = useState(item?.is_active ?? true);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }

    const payload: any = {
      name: name.trim(),
      description: description.trim(),
      is_active: isActive,
    };

    if (item?.id) payload.id = item.id;

    const { error } = await supabase.from(table).upsert([payload]);
    if (error) {
      Alert.alert('Database Error', error.message);
    } else {
      onSaveSuccess();
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.label}>Name</Text>
      <TextInput style={globalStyles.input} value={name} onChangeText={setName} />

      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        style={[globalStyles.input, { height: 80, marginBottom: 20 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={globalStyles.label}>Active</Text>
      <View style={globalStyles.switchRow}>
        <Text>{isActive ? 'Yes' : 'No'}</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </View>

      <Button title="Save" onPress={handleSubmit} />
    </ScrollView>
  );
}
