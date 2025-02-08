import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.DOMAIN_RETRIVE_DATA}/api`;

const getAuthToken = () => Cookies.get('authToken');

export const getAthletes = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/athletes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const storeAthlete = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/athletes`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getAthlete = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/athletes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getAthletePeople = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/athelete-people/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateAthlete = async (id, data) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(`${API_BASE_URL}/athletes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteAthlete = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/athletes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus atlet:', error.response?.data?.message || error.message);
    throw error;
  }
};
