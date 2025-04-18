// BuilderListScreen.tsx

import React from 'react';
import { UniversalListScreen } from '../components/UniversalListScreen';
import { Builder } from './types';

export default function BuilderListScreen() {
  return (
    <UniversalListScreen<Builder>
      title="Builders"
      table="builders"
      formScreen="BuilderFormScreen"
      fields={['name', 'city']}
      />
  );
}


