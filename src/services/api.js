import { supabase } from '../lib/supabase';

export const apiService = {
  // --- AUTH ---
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.session) {
      localStorage.setItem('adminToken', data.session.access_token);
    }
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error);
    localStorage.removeItem('adminToken');
  },

  getToken() {
    return localStorage.getItem('adminToken');
  },

  // --- IMAGES ---
  async getImages() {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      return [];
    }

    // Get public URL for each image
    return data.map(img => ({
      ...img,
      // Assume files are in a bucket named 'portfolio'
      publicUrl: supabase.storage.from('portfolio').getPublicUrl(img.filename).data.publicUrl
    }));
  },

  async uploadImage(file, description, resolution) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Save metadata to Database
    const { data, error: dbError } = await supabase
      .from('images')
      .insert([
        { 
          filename: filePath, 
          description, 
          resolution 
        }
      ])
      .select();

    if (dbError) throw dbError;
    return data[0];
  },

  async deleteImage(id, filename) {
    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
      .from('portfolio')
      .remove([filename]);

    if (storageError) console.error('Error deleting from storage:', storageError);

    // 2. Delete from Database
    const { error: dbError } = await supabase
      .from('images')
      .delete()
      .match({ id });

    if (dbError) throw dbError;
    return { success: true };
  }
};
