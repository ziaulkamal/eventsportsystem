import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getAuthToken = () => Cookies.get('authToken');

export const getCoaches = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/coaches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const storeCoach = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/coaches`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getCoach = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/coaches/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getCoachPeople = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/coach-people/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateCoach = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_BASE_URL}/coaches/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteCoach = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/coaches/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus pelatih:', error.response?.data?.message || error.message);
    throw error;
  }
};
