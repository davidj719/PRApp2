// BuilderContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../app/supabase';

export type Builder = {
  id: string;
  name: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  active?: boolean;
};

type BuilderContextType = {
  builders: Builder[];
  addBuilder: (builder: Omit<Builder, 'id'>) => void;
  updateBuilder: (builder: Builder) => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [builders, setBuilders] = useState<Builder[]>([]);

  useEffect(() => {
    const fetchBuilders = async () => {
      const { data, error } = await supabase.from('builders').select('*').order('created_at');
      if (error) console.error('Error loading builders:', error);
      else setBuilders(data);
    };
    fetchBuilders();
  }, []);

  const addBuilder = async (builder: Omit<Builder, 'id'>) => {
    const { data, error } = await supabase.from('builders').insert([builder]).select();
    if (error) {
      console.error('Error adding builder:', error);
    } else if (data) {
      setBuilders((prev) => [...prev, ...data]);
    }
  };

  const updateBuilder = async (builder: Builder) => {
    const { data, error } = await supabase.from('builders').update(builder).eq('id', builder.id).select();
    if (error) {
      console.error('Error updating builder:', error);
    } else if (data) {
      setBuilders((prev) => prev.map(b => b.id === builder.id ? data[0] : b));
    }
  };

  return (
    <BuilderContext.Provider value={{ builders, addBuilder, updateBuilder }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (!context) throw new Error('useBuilderContext must be used within a BuilderProvider');
  return context;
};
