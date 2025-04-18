// BuilderFormScreen.tsx

import React from 'react';
import { UniversalFormScreen } from '../components/UniversalFormScreen';

export default function BuilderFormScreen() {
  return (
    <UniversalFormScreen
      title="Builder"
      table="builders"
      fields={[
        { name: 'name', label: 'Builder Name' },
        { name: 'address_line1', label: 'Address Line 1' },
        { name: 'address_line2', label: 'Address Line 2' },
        { name: 'city', label: 'City' },
        { name: 'state', label: 'State' },
        { name: 'postal_code', label: 'Postal Code' },
        { name: 'phone_number', label: 'Phone Number' },
      ]}
    />
  );
}
