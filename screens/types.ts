// types.ts

export type Builder = {
  id: string;
  name: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  phone_number?: string;
  is_active: boolean;
};

export type ProjectAddress = {
  id: string;
  builder_id: string;
  address_line1: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  is_active: boolean;
  builders?: {
    name: string;
  };
};

export type ProjectType = {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
};

export type TaskCategory = {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
};

export type TaskLevel = {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
};

export type Employee = {
  id: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  hourly_wage?: number;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  level?: string;
  is_active: boolean;
  created_at?: string;
};

export type TaskDetails = {
  id: string;
  name: string;
  description?: string;
  billed_price?: number;
  employee_payout_price?: number;
  how_to_url?: string;
  task_category_id?: string;
  task_level_id?: string;
  is_active: boolean;
  created_at?: string;
  task_categories?: {
    name?: string;
  };
};

export type ProjectStatus = {
  id: string;
  builder_id: string;
  address_id: string;
  project_type_id: string;
  project_info?: string;
  confirmed?: boolean;
  start_date?: string;
  finish_date?: string;
  work_complete?: boolean;
  walkthrough_complete?: boolean;
  invoice_number?: string;
  invoice_sent?: boolean;
  employee_id?: string;
  manager_id?: string;
  notes?: string;
  is_active: boolean;
  created_at?: string;
};

export type AppStackParamList = {
  TaskDetailsListScreen: undefined;
  TaskDetailsFormScreen: { id?: string };
  Home: undefined;
  BuilderListScreen: undefined;
  BuilderFormScreen: { id?: string };
  AddressListScreen: undefined;
  AddressFormScreen: { id?: string };
  ProjectTypeListScreen: undefined;
  ProjectTypeFormScreen: { item?: ProjectType } | undefined;
  Employee: undefined;
  EmployeeForm: { id?: string } | undefined;
  ProjectStatusListScreen: undefined;
  ProjectStatusFormScreen: { id?: string } | undefined;
  TaskCategoryListScreen: undefined;
  TaskCategoryFormScreen: { item?: TaskCategory } | undefined;
  TaskLevelListScreen: undefined;
  TaskLevelFormScreen: { id?: string };
};
