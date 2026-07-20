import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getSingle = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(1)
    .single();
  
  if (error) throw error;
  return data;
};

export const getAll = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

export const getAboutMe = () => getSingle('about_me');
export const getUpdates = () => getAll('updates');
export const getProjects = () => getAll('projects');
export const getContacts = () => getAll('contacts');

//------------------------------------------------------------------------------------------

export const registerAccess = async (location) => {
  const { error } = await supabase.from('accesses').insert({
    latitude_coarse: location ? Number(location.latitude.toFixed(1)) : null,
    longitude_coarse: location ? Number(location.longitude.toFixed(1)) : null,
    accuracy_m: location ? Math.round(location.accuracy) : null,
  });
  if (error) throw error;
};