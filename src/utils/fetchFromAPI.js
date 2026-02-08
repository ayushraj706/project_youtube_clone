import axios from 'axios';

export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

const options = {
  params: {
    maxResults: '50',
    key: process.env.REACT_APP_GOOGLE_API_KEY
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
