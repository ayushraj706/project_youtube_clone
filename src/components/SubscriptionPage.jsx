import React, { useState, useEffect, useRef } from 'react';
// 🚀 Smart Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { VideoCard } from './';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null); 
  const userEmail = localStorage.getItem('userEmail');
  const scrollRef = useRef(null);

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

  const handleChannelClick = (channelId) => {
    setLoading(true);
    setVideos([]); 
    setSelectedChannel(channelId);
    
    fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date&maxResults=50`)
      .then((data) => {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken); 
        setLoading(false);
      });
  };

  const fetchMoreVideos = () => {
    if (!nextPageToken || fetchingMore) return;

    setFetchingMore(true);
    fetchFromAPI(`search?channelId=${selectedChannel}&part=snippet&order=date&maxResults=50&pageToken=${nextPageToken}`)
      .then((data) => {
        setVideos((prevVideos) => [...prevVideos, ...data.items]); 
        setNextPageToken(data.nextPageToken);
        setFetchingMore(false);
      });
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) { 
      fetchMoreVideos();
    }
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Box 
        p={2} 
        onScroll={handleScroll} 
        sx={{ overflowY: 'auto', height: '92vh', bgcolor: '#000', color: 'white' }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>All Subscriptions</Typography>
        
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2, mb: 3 }}>
          {channels.map((chan) => (
            <Stack key={chan.channelId} alignItems="center" spacing={1} onClick={() => handleChannelClick(chan.channelId)} sx={{ cursor: 'pointer', minWidth: '75px' }}>
              <Avatar src={chan.channelAvatar} sx={{ width: 65, height: 65, border: selectedChannel === chan.channelId ? '3px solid #FF1100' : 'none' }} />
              <Typography variant="caption" noWrap sx={{ width: '70px', textAlign: 'center' }}>{chan.channelName}</Typography>
            </Stack>
          ))}
        </Stack>

        <hr style={{ borderColor: '#222' }} />

        <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>Latest Videos</Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
               <Box key={i} sx={{ width: { xs: '100%', sm: '358px', md: '320px' } }}>
                 <Skeleton height={180} borderRadius={12} />
               </Box>
             ))
          ) : (
            videos.map((item, idx) => <VideoCard key={idx} video={item} />)
          )}
        </Stack>

        {fetchingMore && (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={24} sx={{ color: '#FF1100' }} />
          </Box>
        )}
      </Box>
    </SkeletonTheme>
  );
};

export default SubscriptionPage;
