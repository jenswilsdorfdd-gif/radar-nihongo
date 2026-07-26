import { createClient } from '@supabase/supabase-js';

// Kopiere diese beiden Werte aus deinem Supabase Dashboard (Settings -> API)
const supabaseUrl = 'https://zfhnbrgnhrkhqgdryuni.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaG5icmduaHJraHFnZHJ5dW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNDQ5MjUsImV4cCI6MjEwMDYyMDkyNX0.1xRfyYmYp8sWH3gFNiUwRm0ITzTnfjBdQTJgdnPNXu8';

export const supabase = createClient(supabaseUrl, supabaseKey);