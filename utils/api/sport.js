import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.DOMAIN_RETRIVE_DATA}/api`;

const getAuthToken = () => Cookies.get('authToken');

export const getSport = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/sports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return { code: 404, message: 'Gagal mengambil data'}
  }
};