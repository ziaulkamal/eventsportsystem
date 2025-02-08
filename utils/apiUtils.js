import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { parse, format } from 'date-fns';
import { fieldMessages } from "./ValidationForm";

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const fetchPeopleByNIK = async (nik) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fetch-people/${nik}`);
        return response.data;
    } catch (error) {
        return { error: "NOT_FOUND" };
    }
};

export const fetchPeopleByAttributes = async (attributes) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/fetch-people-with-attribute?name=${attributes.name}&birthdate=${attributes.birthdate}&gender=${attributes.gender}&personIdentity=${attributes.personIdentity}`
        );
        return response.data;
    } catch (error) {
        return { error: "NOT_FOUND" };
    }
};

export const findPeopleByNIK = async (nik) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/people/nik/${nik}`);
        return { data: response.data };
    } catch (error) {
        return { error: "NOT_FOUND" };
    }
};

const calculateAge = (birthdate) => {
    if (!birthdate) return 0;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    if (!isBirthdayPassed) age--;
    return age;
};

export const formatPersonData = (rawData) => {
    const age = calculateAge(rawData.birthdate);
    const documentId = rawData.documentId || uuidv4();
    const id = uuidv4();
    return {
        id: id,
        fullName: String(rawData.fullName || ''),
        age: age,
        birthdate: rawData.birthdate ? rawData.birthdate.split('-').reverse().join('-') : null,
        identityNumber: String(rawData.identityNumber || ''),
        familyIdentityNumber: rawData.familyIdentityNumber || null,
        gender: ['male', 'female'].includes(rawData.gender) ? rawData.gender : 'male',
        streetAddress: String(rawData.streetAddress || ''),
        religion: parseInt(rawData.religion, 10) || 0,
        provinceId: parseInt(rawData.provinceId, 10) || 0,
        regencieId: parseInt(rawData.regencieId, 10) || 0,
        districtId: parseInt(rawData.districtId, 10) || 0,
        villageId: parseInt(rawData.villageId, 10) || 0,
        phoneNumber: String(rawData.phoneNumber || ''),
        email: rawData.email || null,
        documentId: documentId,
        userId: rawData.userId || null,
    };
};

export const createPerson = async (personData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/people`, personData);
        return { data: response.data };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422 && error.response.data?.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                    .map(([field, messages]) => `${fieldMessages[field] || field}: ${messages.join(', ')}`)
                    .join('\n');
                return { error: errorMessages };
            }
            return { error: error.response.data?.message || 'Terjadi kesalahan pada server.' };
        } else if (error.request) {
            return { error: 'Tidak ada respons dari server. Periksa koneksi internet Anda.' };
        } else {
            return { error: error.message || 'Terjadi kesalahan yang tidak diketahui.' };
        }
    }
};

export const createAthlete = async (athleteData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/athletes`, athleteData);
        return { data: response.data };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 422 && error.response.data?.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                    .map(([field, messages]) => `${fieldMessages[field] || field}: ${messages.join(', ')}`)
                    .join('\n');
                return { error: errorMessages };
            }
            return { error: error.response.data?.message || 'Terjadi kesalahan pada server.' };
        } else if (error.request) {
            return { error: 'Tidak ada respons dari server. Periksa koneksi internet Anda.' };
        } else {
            return { error: error.message || 'Terjadi kesalahan yang tidak diketahui.' };
        }
    }
};

export const fetchKontingen = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/kontingen`);
        return response.data;
    } catch (error) {
        return { error: "Unable to fetch kontingen data" };
    }
};

export const fetchSports = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sports`);
        return response.data;
    } catch (error) {
        return { error: "Unable to fetch sport data" };
    }
};