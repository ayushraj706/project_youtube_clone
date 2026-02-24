// api/videos.js (Node.js Backend)
const axios = require('axios');

export default async function handler(req, res) {
  const { endpoint, params } = req.query; // Frontend se query aayegi
  const keysString = process.env.YOUTUBE_API_KEYS || "";
  const apiKeys = keysString.split(",").map(k => k.trim());
  
  let currentKeyIndex = 0;

  // Rotation Logic
  async function tryFetch() {
    try {
      // Google Cloud API ka asli URL
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/${endpoint}`, {
        params: {
          ...JSON.parse(params),
          key: apiKeys[currentKeyIndex], // Google Cloud mein 'key' parameter use hota hai
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      // Quota limit ya error aane par key badlein
      if (error.response && (error.response.status === 429 || error.response.status === 403)) {
        currentKeyIndex++;
        if (currentKeyIndex < apiKeys.length) {
          console.log(`Key changed to index: ${currentKeyIndex}`);
          return tryFetch(); // Agali key ke saath retry
        } else {
          return res.status(429).json({ error: "Sari keys ka quota khatam!" });
        }
      }
      return res.status(500).json({ error: "Backend error" });
    }
  }

  return tryFetch();
}

