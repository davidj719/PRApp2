// AddressListScreen.tsx

import React from 'react';
import { UniversalListScreen } from '../components/UniversalListScreen';
import { ProjectAddress } from './types';

export default function AddressListScreen() {
  return (
    <UniversalListScreen<ProjectAddress>
      title="Addresses"
      table="project_addresses"
      formScreen="AddressFormScreen"
      fields={['address_line1', 'city']}
    />
  );
}
