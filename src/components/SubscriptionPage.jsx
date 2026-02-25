import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { VideoCard } from './';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchSubs = async () => {
      if (!userEmail) {
        alert("Bhai, Email nahi mil raha! LocalStorage check karo.");
        setLoading(false);
        return;
      }
      
      try {
        const q = query(collection(db, "subscriptions"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const rawData = querySnapshot.docs.map(doc => doc.data());

        // DEBUG ALERT: Ye batayega ki kitne items mile
        console.log("Found Subs:", rawData);
        
        // Filter: Sirf wahi dikhao jinme Naam aur Photo hai
        const cleanData = rawData.filter(chan => chan.channelName && chan.channelName !== "Unknown Channel");
        
        if (rawData.length > 0 && cleanData.length === 0) {
          alert("Database mein " + rawData.length + " items mile, par sab 'Unknown' hain. Phir se subscribe karo!");
        }

        setChannels(cleanData);
      } catch (err) {
        alert("Firebase Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, [userEmail]);

  const handleChannelClick = (channelId) => {
    setLoading(true);
    setSelectedChannel(channelId);
    fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`)
      .then((data) => {
        setVideos(data.items);
        setLoading(false);
      });
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Box p={2} sx={{ overflowY: 'auto', height: '92vh', bgcolor: '#000', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>All Subscriptions</Typography>
        
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2, mb: 3 }}>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Stack key={i} spacing={1}><Skeleton circle width={65} height={65} /><Skeleton width={50} /></Stack>
            ))
          ) : channels.length > 0 ? (
            channels.map((chan) => (
              <Stack key={chan.channelId} alignItems="center" spacing={1} onClick={() => handleChannelClick(chan.channelId)} sx={{ cursor: 'pointer', minWidth: '75px' }}>
                <Avatar src={chan.channelAvatar} sx={{ width: 65, height: 65, border: selectedChannel === chan.channelId ? '3px solid #FF1100' : 'none' }} />
                <Typography variant="caption" noWrap sx={{ width: '70px', textAlign: 'center' }}>{chan.channelName}</Typography>
              </Stack>
            ))
          ) : (
            <Typography variant="body2" color="gray">Kahi subscribe nahi kiya ya data kachra hai. Kisi channel par ja kar Ghanti dabao!</Typography>
          )}
        </Stack>

        <hr style={{ borderColor: '#222' }} />

        <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>Latest Videos</Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {videos.length > 0 ? (
            videos.map((item, idx) => <VideoCard key={idx} video={item} />)
          ) : (
            !loading && <Typography variant="body2" color="gray">Videos dekhne ke liye upar avatar par click karein.</Typography>
          )}
        </Stack>
      </Box>
    </SkeletonTheme>
  );
};

export default SubscriptionPage;
