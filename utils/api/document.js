import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.DOMAIN_RETRIVE_DATA}/api`;

const getAuthToken = () => Cookies.get('authToken');

export const storeDocument = async (formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan dokumen:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateDocument = async (id, formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/documents/${id}`, formData, {
      headers: {
             'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      params: {
        _method: 'PUT',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate dokumen:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const patchDocument = async (id, formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(`${API_BASE_URL}/documents-patch/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      params: {
        _method: 'PUT',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate dokumen:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getDocuments = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil dokumen:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getDocument = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail dokumen:', error.response?.data?.message || error.message);
    // throw error;
  }
};

export const deleteDocument = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus dokumen:', error.response?.data?.message || error.message);
    throw error;
  }
};
