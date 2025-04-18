// ProjectStatusFormScreen.tsx (refactored to use globalStyles)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Button,
  Alert,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { supabase } from '../app/supabase';
import { Builder, ProjectAddress, ProjectType, Employee, AppStackParamList } from './types';
import { globalStyles } from '../styles/global';

const ProjectStatusFormScreen = ({ route, navigation }: NativeStackScreenProps<AppStackParamList, 'ProjectStatusFormScreen'>) => {
    const projectStatusId = route?.params?.id || null;

  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [allAddresses, setAllAddresses] = useState<ProjectAddress[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<ProjectAddress[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedManager, setSelectedManager] = useState('');

  const [confirmed, setConfirmed] = useState(false);
  const [projectInfo, setProjectInfo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [notes, setNotes] = useState('');
  const [workComplete, setWorkComplete] = useState(false);
  const [walkthroughComplete, setWalkthroughComplete] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);

  useEffect(() => {
    loadDropdownData();
  }, []);

  useEffect(() => {
    if (projectStatusId && dropdownsLoaded) {
      loadExistingProject();
    }
  }, [dropdownsLoaded]);

  const loadDropdownData = async () => {
    const [builderData, addressData, typeData, employeeData] = await Promise.all([
      supabase.from('builders').select('id, name, is_active').eq('is_active', true).order('name'),
      supabase.from('addresses').select('id, address_line1, builder_id, is_active'),
      supabase.from('project_types').select('id, name').order('name'),
      supabase.from('employees').select('id, first_name, last_name, is_active').order('last_name'),
    ]);

    setBuilders(builderData.data || []);
    setAllAddresses(addressData.data || []);
    setProjectTypes(typeData.data || []);
    setEmployees(employeeData.data || []);
    setDropdownsLoaded(true);
  };

  const loadExistingProject = async () => {
    const { data, error } = await supabase.from('project_statuses').select('*').eq('id', projectStatusId).single();
    if (error || !data) return;

    setSelectedBuilder(data.builder_id);
    setSelectedAddress(data.address_id);
    setSelectedType(data.project_type_id);
    setSelectedEmployee(data.employee_id || '');
    setSelectedManager(data.manager_id || '');
    setConfirmed(data.confirmed);
    setProjectInfo(data.project_info || '');
    setStartDate(data.start_date || '');
    setFinishDate(data.finish_date || '');
    setInvoiceNumber(data.invoice_number || '');
    setInvoiceSent(data.invoice_sent);
    setNotes(data.notes || '');
    setWorkComplete(data.work_complete);
    setWalkthroughComplete(data.walkthrough_complete);
    setIsActive(data.is_active);
    filterAddresses(data.builder_id);
  };

  const filterAddresses = (builderId: string) => {
    const filtered = allAddresses.filter((a) => a.builder_id === builderId && a.is_active);
    setFilteredAddresses(filtered);
  };

  const handleSubmit = async () => {
    const payload = {
      builder_id: selectedBuilder,
      address_id: selectedAddress,
      project_type_id: selectedType,
      employee_id: selectedEmployee || null,
      manager_id: selectedManager || null,
      confirmed,
      project_info: projectInfo || null,
      start_date: startDate,
      finish_date: finishDate || null,
      invoice_number: invoiceNumber || null,
      invoice_sent: invoiceSent,
      notes: notes || null,
      work_complete: workComplete,
      walkthrough_complete: walkthroughComplete,
      is_active: isActive,
    };

    if (projectStatusId) {
      Object.assign(payload, { id: projectStatusId });
    }

    const { error } = await supabase.from('project_statuses').upsert([payload]);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={globalStyles.cardElevated}>
        <Text style={globalStyles.label}>Builder Name *</Text>
        <View style={globalStyles.inputWrapperElevated}>
          <Picker selectedValue={selectedBuilder} onValueChange={setSelectedBuilder}>
            <Picker.Item label="-Select-" value="" />
            {builders.map(b => (
              <Picker.Item key={b.id} label={b.name} value={b.id} />
            ))}
          </Picker>
        </View>

        <Text style={globalStyles.label}>Project Address *</Text>
        <View style={globalStyles.inputWrapper}>
          <Picker selectedValue={selectedAddress} onValueChange={(value) => {
            if (value === '__add__') {
              if (!selectedBuilder) {
                Alert.alert('Please select a builder first.');
                return;
              }
              navigation.navigate('AddressForm', {
                address: { builder_id: selectedBuilder } as any,
              });

              const unsubscribe = navigation.addListener('focus', async () => {
                const { data } = await supabase
                  .from('addresses')
                  .select('id, address_line1, builder_id, is_active')
                  .eq('is_active', true);

                setAllAddresses(data || []);
                const newlyAdded = (data || []).filter(a => a.builder_id === selectedBuilder);
                if (newlyAdded.length > 0) {
                  const latest = newlyAdded[newlyAdded.length - 1];
                  setSelectedAddress(latest.id);
                  setFilteredAddresses(newlyAdded);
                }

                unsubscribe();
              });
            } else {
              setSelectedAddress(value);
            }
          }}>
            <Picker.Item label="-Select-" value="" />
            {filteredAddresses.map(a => (
              <Picker.Item key={a.id} label={a.address_line1} value={a.id} />
            ))}
            <Picker.Item label="+ Add New Address" value="__add__" />
          </Picker>
        </View>

        <Text style={globalStyles.label}>Project Info</Text>
        <TextInput style={globalStyles.input} value={projectInfo} onChangeText={setProjectInfo} placeholder="Enter project info" />

        <Text style={globalStyles.label}>Project Type *</Text>
        <View style={globalStyles.inputWrapper}>
          <Picker selectedValue={selectedType} onValueChange={setSelectedType}>
            <Picker.Item label="-Select-" value="" />
            {projectTypes.map(pt => (
              <Picker.Item key={pt.id} label={pt.name} value={pt.id} />
            ))}
          </Picker>
        </View>

        <Text style={globalStyles.label}>Confirmed</Text>
        <Switch value={confirmed} onValueChange={setConfirmed} />

        <Text style={globalStyles.label}>Start Date *</Text>
        <TextInput
          style={globalStyles.input}
          value={startDate}
          placeholder="YYYY-MM-DD"
          onFocus={() => {
            setShowStartDatePicker(true);
            Keyboard.dismiss();
          }}
          showSoftInputOnFocus={false}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate ? new Date(startDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (event.type === 'set' && date) {
                setStartDate(date.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        <Text style={globalStyles.label}>Finish Date</Text>
        <TextInput
          style={globalStyles.input}
          value={finishDate}
          placeholder="YYYY-MM-DD"
          onFocus={() => {
            setShowFinishDatePicker(true);
            Keyboard.dismiss();
          }}
          showSoftInputOnFocus={false}
        />
        {showFinishDatePicker && (
          <DateTimePicker
            value={finishDate ? new Date(finishDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowFinishDatePicker(false);
              if (event.type === 'set' && date) {
                setFinishDate(date.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        <Text style={globalStyles.label}>Work Complete</Text>
        <Switch value={workComplete} onValueChange={setWorkComplete} />

        <Text style={globalStyles.label}>Post Job Walkthrough Complete</Text>
        <Switch value={walkthroughComplete} onValueChange={setWalkthroughComplete} />

        <Text style={globalStyles.label}>Invoice Number</Text>
        <TextInput style={globalStyles.input} value={invoiceNumber} onChangeText={setInvoiceNumber} placeholder="Invoice number" />

        <Text style={globalStyles.label}>Invoice Sent</Text>
        <Switch value={invoiceSent} onValueChange={setInvoiceSent} />

        <Text style={globalStyles.label}>Employee</Text>
        <View style={globalStyles.inputWrapper}>
          <Picker selectedValue={selectedEmployee} onValueChange={setSelectedEmployee}>
            <Picker.Item label="-Select-" value="" />
            {employees.map(e => (
              <Picker.Item key={e.id} label={`${e.first_name ?? ''} ${e.last_name ?? ''}`} value={e.id} />
            ))}
          </Picker>
        </View>

        <Text style={globalStyles.label}>Manager</Text>
        <View style={globalStyles.inputWrapper}>
          <Picker selectedValue={selectedManager} onValueChange={setSelectedManager}>
            <Picker.Item label="-Select-" value="" />
            {employees.map(e => (
              <Picker.Item key={e.id} label={`${e.first_name ?? ''} ${e.last_name ?? ''}`} value={e.id} />
            ))}
          </Picker>
        </View>

        <Text style={globalStyles.label}>Notes</Text>
        <TextInput
          style={[globalStyles.input, { height: 100 }]}
          multiline
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes"
        />

        <Text>Status</Text>
        <View style={globalStyles.switchRow}>
          <Text>{isActive ? 'Open' : 'Closed'}</Text>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default ProjectStatusFormScreen;
