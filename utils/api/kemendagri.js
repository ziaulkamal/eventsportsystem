import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/provinces`);
    return response.data;
  } catch (error) {
    return { code: 404 }
  }
};

export const getRegencies = async (provinceId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/regencies/${provinceId}`);
    return response.data;
  } catch (error) {
    return { code: 404 }
  }
};

export const getDistricts = async (regencyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/districts/${regencyId}`);
    return response.data;
  } catch (error) {
    return { code: 404 }
  }
};

export const getVillages = async (districtId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villages/${districtId}`);
    return response.data;
  } catch (error) {
    return { code: 404 }
  }
};

export const getKontingen = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/kontingen`);
    return response.data;
  } catch (error) {
    return { code: 404 }
  }
};