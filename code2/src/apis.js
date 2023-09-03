import axios from 'axios';

const BASE_URL = 'http://20.244.56.144:80/train';

const getToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      companyName: 'Train Central',
      ownerName: 'Ram',
      rollNo: '1',
      ownerEmail: 'ram@abc.edu',
      accessCode: 'FKDLjg',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAuthorizationHeaders = async () => {
  const tokenData = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  };
};

export const getAllTrains = async () => {
  const headers = await getAuthorizationHeaders();
  try {
    const response = await axios.get(`${BASE_URL}/trains`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleTrain = async (trainNumber) => {
  const headers = await getAuthorizationHeaders();
  try {
    const response = await axios.get(`${BASE_URL}/trains/${trainNumber}`, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
