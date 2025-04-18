// UniversalFormScreen.tsx

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { supabase } from '../app/supabase';
import { AppStackParamList } from '../screens/types';
import { globalStyles } from '../styles/global';

interface FieldConfig {
    name: string;
    label?: string;
    type?: 'text' | 'dropdown';
    table?: string;
    labelField?: string;
}

export function UniversalFormScreen({
    table,
    title,
    fields = ['name', 'description'],
}: {
    table: string;
    title: string;
    fields?: (string | FieldConfig)[];
}) {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<AppStackParamList, keyof AppStackParamList>>();
    const id = (route.params as any)?.id;

    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [dropdownOptions, setDropdownOptions] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        async function loadDropdowns() {
            const dropdownFields = fields.filter(f => typeof f !== 'string' && f.type === 'dropdown') as FieldConfig[];
            const loads = await Promise.all(dropdownFields.map(async (field) => {
                const { data, error } = await supabase.from(field.table!).select('*');
                if (error) console.error(`Failed to load options for ${field.name}`, error);
                return { key: field.name, options: data || [] };
            }));
            const optionsMap: { [key: string]: any[] } = {};
            loads.forEach(({ key, options }) => optionsMap[key] = options);
            setDropdownOptions(optionsMap);
        }

        loadDropdowns();

        if (id) {
            supabase.from(table).select('*').eq('id', id).single().then(({ data, error }) => {
                if (error) console.error(error);
                if (data) setFormData(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (id) {
            await supabase.from(table).update(formData).eq('id', id);
        } else {
            await supabase.from(table).insert([formData]);
        }
        navigation.goBack();
    };

    if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;

    return (
        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={globalStyles.cardElevated}>
                    <Text style={globalStyles.title}>{id ? `Edit ${title.replace(/([a-z])([A-Z])/g, '$1 $2')}` : `New ${title.replace(/([a-z])([A-Z])/g, '$1 $2')}`}</Text>
                    {(fields as FieldConfig[]).map((fieldDef) => {
                        const field: FieldConfig = typeof fieldDef === 'string' ? { name: fieldDef, type: 'text' } : fieldDef;
                        const label = (field.label || field.name).charAt(0).toUpperCase() + (field.label || field.name).slice(1);

                        return (
                            <View key={field.name} style={{ marginBottom: 16 }}>
                                <Text style={globalStyles.label}>{label}</Text>
                                {field.type === 'dropdown' ? (
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 8,
                                        paddingHorizontal: 12,
                                        marginTop: 4,
                                        marginBottom: 8,
                                    }}>
                                        <Picker
                                            selectedValue={formData[field.name] || ''}
                                            onValueChange={(value) => handleChange(field.name, value)}>
                                            <Picker.Item label={`Select ${label}`} value="" />
                                            {(dropdownOptions[field.name] || []).map((option, index) => (
                                                <Picker.Item
                                                    key={option.id ?? `${field.name}-${index}`}
                                                    label={option[field.labelField || 'name']}
                                                    value={option.id}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                ) : (
                                    <TextInput
                                        style={globalStyles.input}
                                        value={formData[field.name] || ''}
                                        onChangeText={(text) => handleChange(field.name, text)}
                                        placeholder={label}
                                    />
                                )}
                            </View>
                        );
                    })}
                    <Button title="Save" onPress={handleSave} />
                </View>
            </ScrollView>
        </View>
    );
}
