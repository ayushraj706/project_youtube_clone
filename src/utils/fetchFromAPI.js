import axios from 'axios';

export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

const options = {
  params: {
    maxResults: '50',
    key: process.env.REACT_APP_GOOGLE_API_KEY
  }
};

// Yahan badlav kiya hai: Ab ye 'customParams' bhi lega
export const fetchFromAPI = async (url, customParams = {}) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, {
    // Purane params + Naye params (jaise pageToken) ko mix kar diya
    params: { ...options.params, ...customParams }
  });
  return data;
};
