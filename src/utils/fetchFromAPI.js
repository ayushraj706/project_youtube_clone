// utils/fetchFromAPI.js
import axios from "axios";

export const fetchFromAPI = async (url) => {
  // url format: "search?part=snippet&q=coding"
  const [endpoint, queryParams] = url.split('?');
  
  // Query parameters ko object mein badalna
  const params = Object.fromEntries(new URLSearchParams(queryParams));

  try {
    // Apne hi backend ko call karo
    const { data } = await axios.get(`/api/videos`, {
      params: {
        endpoint: endpoint,
        params: JSON.stringify(params)
      }
    });
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};
