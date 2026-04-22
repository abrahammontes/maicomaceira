const { createClient } = require('@supabase/supabase-js');

const url = 'https://vydqfvlyjukiqxpntxmt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZHFmdmx5anVraXF4cG50eG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MTM5MzIsImV4cCI6MjA5MjM4OTkzMn0.mR3gxf8dtIunLTc8vBTB9JFIexneXp_nYuCXqTWLx6Q';

const supabase = createClient(url, key);

async function test() {
  try {
    console.log('Testing connection to Supabase...');
    const { data, error } = await supabase.from('images').select('*').limit(1);
    if (error) {
      console.error('Error querying DB:', error);
    } else {
      console.log('DB Connection SUCCESS. Data:', data);
    }

    console.log('Testing storage connection...');
    const { data: storageData, error: storageError } = await supabase.storage.getBucket('portfolio');
    if (storageError) {
      console.error('Error fetching bucket:', storageError);
    } else {
      console.log('Storage Connection SUCCESS. Bucket:', storageData);
    }
  } catch (err) {
    console.error('Fetch error caught:', err.message);
  }
}

test();
