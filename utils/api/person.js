import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getAuthToken = () => Cookies.get('authToken');

export const getPeople = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/people`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data orang:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const storePerson = async (data) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/people`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan data orang:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getPerson = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/people/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail orang:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updatePerson = async (id, data) => {
    // console.log(id, data);
    // return;
    
  try {
    const token = getAuthToken();
    const response = await axios.patch(`${API_BASE_URL}/people/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate data orang:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const deletePerson = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/people/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus data orang:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const findPersonByNIK = async (nik) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/people/find-by-nik/${nik}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { code: response.status, data: response.data};
  } catch (error) {
    return { error: 'Tidak ada respons dari server. Periksa koneksi internet Anda.' };
  }
};

export const fetchPeopleByNIK = async (nik) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/fetch-people/${nik}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { code: 200, data: response.data};
  } catch (err) {
    return { error: 'Tidak ada respons dari server. Periksa koneksi internet Anda.' };
  }
};

export const fetchPeopleByAttributes = async (attributes) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/fetch-people-with-attribute?name=${attributes.name}&birthdate=${attributes.birthdate}&gender=${attributes.gender}&personIdentity=${attributes.personIdentity}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { code : 404 };
  }
};

export const getAthletes = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/athlete-complete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data athlete:', error.response?.data?.message || error.message);
    return { code: 500 };
  }
};

export const getCoach = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/coach-complete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data athlete:', error.response?.data?.message || error.message);
    return { code: 500 };
  }
};
