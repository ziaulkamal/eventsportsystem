import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Fungsi untuk login
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const login = async (usernameOrEmail, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        username_or_email: usernameOrEmail,
        password: password,
      }
    );

    if (response.data.success) {
      // Simpan token di cookies menggunakan js-cookie
      Cookies.set('authToken', response.data.token, { expires: 7, path: '/' });  // Token akan disimpan selama 7 hari
      // Simpan data user ke localStorage
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data;
    }
  } catch (error) {
    throw error
    console.error('Error during login:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const token = Cookies.get('authToken');  // Ambil token dari cookies

    if (!token) {
      throw new Error('No user is logged in');
    }

    // Kirim request logout ke backend
    await axios.post(
      `${API_BASE_URL}/logout`, 
      {}, 
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,  // Kirim cookies bersama dengan request
      }
    );

    // Hapus token dan user data dari cookies dan localStorage
    Cookies.remove('authToken');  // Hapus token dari cookies
    localStorage.removeItem('user');  // Hapus data user dari localStorage
    sessionStorage.clear();  // Hapus semua data di sessionStorage

    // Hapus semua cookies
    const allCookies = document.cookie.split(';');
    allCookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      Cookies.remove(cookieName);  // Hapus setiap cookie yang ada
    });

    return true;
  } catch (error) {
    console.error('Error during logout:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};