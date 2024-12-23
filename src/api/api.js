import axios from 'axios';

const BASE_URL = 'https://localhost:7213/api/Hotelbooking';

export const getHotels = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error ${error.response?.status}: ${error.response?.statusText || error.message}`);
  }
};

export const getHotelById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error ${error.response?.status}: ${error.response?.statusText || error.message}`);
  }
};
