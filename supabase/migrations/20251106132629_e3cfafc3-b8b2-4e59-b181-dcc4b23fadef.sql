-- Remove foreign key constraint from daily_entries to auth.users
ALTER TABLE public.daily_entries 
DROP CONSTRAINT IF EXISTS daily_entries_user_id_fkey;

-- Optionally add a foreign key to profiles table instead (more appropriate)
ALTER TABLE public.daily_entries 
ADD CONSTRAINT daily_entries_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;