// ListSettingsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc';

interface ListSettings {
  filters: Record<string, any>;
  sortField: string | null;
  sortDirection: SortDirection;
}

interface ListSettingsMap {
  [screen: string]: ListSettings;
}

interface ListSettingsContextType {
  settings: ListSettingsMap;
  setFilters: (screen: string, filters: Record<string, any>) => void;
  setSort: (screen: string, field: string, direction: SortDirection) => void;
  resetSettings: (screen: string) => void;
}

const defaultContext: ListSettingsContextType = {
  settings: {},
  setFilters: () => {},
  setSort: () => {},
  resetSettings: () => {},
};

const ListSettingsContext = createContext<ListSettingsContextType>(defaultContext);

export const ListSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<ListSettingsMap>({});

  const setFilters = (screen: string, filters: Record<string, any>) => {
    setSettings(prev => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        filters,
        sortField: prev[screen]?.sortField || null,
        sortDirection: prev[screen]?.sortDirection || 'asc',
      },
    }));
  };

  const setSort = (screen: string, field: string, direction: SortDirection) => {
    setSettings(prev => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        filters: prev[screen]?.filters || {},
        sortField: field,
        sortDirection: direction,
      },
    }));
  };

  const resetSettings = (screen: string) => {
    setSettings(prev => {
      const updated = { ...prev };
      delete updated[screen];
      return updated;
    });
  };

  return (
    <ListSettingsContext.Provider value={{ settings, setFilters, setSort, resetSettings }}>
      {children}
    </ListSettingsContext.Provider>
  );
};

export const useListSettings = () => useContext(ListSettingsContext);
