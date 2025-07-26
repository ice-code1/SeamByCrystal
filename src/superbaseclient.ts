import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hddbttnggjuieizndxqp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkZGJ0dG5nZ2p1aWVpem5keHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDg0NzIsImV4cCI6MjA2OTEyNDQ3Mn0.STDsr_iFg_6m2EdEBMVqefIW4ACG_qykY_S3VS2oMDY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
