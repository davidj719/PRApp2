// AddressFormScreen.tsx

import React from 'react';
import { UniversalFormScreen } from '../components/UniversalFormScreen';

export default function AddressFormScreen() {
  return (
    <UniversalFormScreen
      title="Address"
      table="project_addresses"
      fields={[
        { name: 'address_line1', label: 'Address Line 1' },
        { name: 'address_line2', label: 'Address Line 2' },
        { name: 'city', label: 'City' },
        { name: 'state', label: 'State' },
        { name: 'postal_code', label: 'Postal Code' },
        { name: 'subdivision', label: 'Subdivision' },
        { name: 'lot_number', label: 'Lot Number' },
      ]}
    />
  );
}