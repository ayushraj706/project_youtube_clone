import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fetchFromAPI } from '../utils/fetchFromAPI'; // Check path
import { VideoCard } from './';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const userEmail = localStorage.getItem('userEmail');

  // 1. Subscribed Channels mangwana
  useEffect(() => {
    const fetchSubs = async () => {
      if (!userEmail) return setLoading(false);
      try {
        const q = query(collection(db, "subscriptions"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const subsData = querySnapshot.docs
          .map(doc => doc.data())
          .filter(chan => chan.channelName && chan.channelName !== "Unknown Channel");
        setChannels(subsData);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchSubs();
  }, [userEmail]);

  // 2. Kisi channel ki videos mangwana (Click karne par)
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
          {loading && channels.length === 0 ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Stack key={i} spacing={1}><Skeleton circle width={65} height={65} /><Skeleton width={50} /></Stack>
            ))
          ) : (
            channels.map((chan) => (
              <Stack key={chan.channelId} alignItems="center" spacing={1} onClick={() => handleChannelClick(chan.channelId)} sx={{ cursor: 'pointer', minWidth: '75px' }}>
                <Avatar src={chan.channelAvatar} sx={{ width: 65, height: 65, border: selectedChannel === chan.channelId ? '3px solid #FF1100' : 'none' }} />
                <Typography variant="caption" noWrap sx={{ width: '70px', textAlign: 'center' }}>{chan.channelName}</Typography>
              </Stack>
            ))
          )}
        </Stack>

        <hr style={{ borderColor: '#222' }} />

        <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>Latest Videos</Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {loading && videos.length === 0 ? (
             Array.from({ length: 4 }).map((_, i) => (
               <Box key={i} sx={{ width: { xs: '100%', sm: '358px', md: '320px' } }}>
                 <Skeleton height={180} borderRadius={12} />
                 <Stack direction="row" spacing={1} mt={1}><Skeleton circle width={40} height={40} /><Skeleton width="80%" /></Stack>
               </Box>
             ))
          ) : (
            videos.map((item, idx) => <VideoCard key={idx} video={item} />)
          )}
        </Stack>
      </Box>
    </SkeletonTheme>
  );
};

export default SubscriptionPage;
