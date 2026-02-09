import axios from 'axios';

export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

// Ye wahi purani settings hain, bas maine ise variable me daal diya
const baseParams = {
  maxResults: '50',
  key: process.env.REACT_APP_GOOGLE_API_KEY
};

// Yahan badlav kiya hai: Ab ye 'customParams' bhi accept karega
export const fetchFromAPI = async (url, customParams = {}) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, {
    params: {
      ...baseParams,  // Aapka API Key aur MaxResults yahan se aayega
      ...customParams // Yahan se 'pageToken' aayega (Infinite Scroll ke liye)
    }
  });
  return data;
};
