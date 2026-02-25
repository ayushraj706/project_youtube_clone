import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase'; // Apna firebase config check kar lena
import { collection, query, where, getDocs } from 'firebase/firestore';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchSubs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "subscriptions"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const subsData = querySnapshot.docs.map(doc => doc.data());
        setChannels(subsData);
      } catch (error) {
        console.error("Error fetching subs:", error);
      }
      // Demo ke liye 1.5 sec ka delay taaki skeleton dikhe
      setTimeout(() => setLoading(false), 1500);
    };

    fetchSubs();
  }, [userEmail]);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', backgroundColor: '#000' }}>
        
        {/* TOP SECTION: Subscribed Channels List */}
        <Typography variant="h6" fontWeight="bold" mb={2} color="white">
          All Subscriptions
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2, mb: 3 }}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Stack key={i} alignItems="center" spacing={1}>
                <Skeleton circle width={60} height={60} />
                <Skeleton width={50} height={10} />
              </Stack>
            ))
          ) : (
            channels.map((chan, idx) => (
              <Stack key={idx} alignItems="center" spacing={1} sx={{ cursor: 'pointer', minWidth: '70px' }}>
                <Avatar src={chan.channelAvatar} sx={{ width: 60, height: 60, border: '2px solid #FF1100' }} />
                <Typography variant="caption" noWrap sx={{ width: '60px', textAlign: 'center' }}>
                  {chan.channelName}
                </Typography>
              </Stack>
            ))
          )}
        </Stack>

        <hr style={{ borderColor: '#333', marginBottom: '20px' }} />

        {/* VIDEO SECTION: Grid Layout */}
        <Typography variant="h6" fontWeight="bold" mb={2} color="white">
          Latest Videos
        </Typography>

        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Box key={idx} sx={{ width: { xs: '100%', sm: '358px', md: '320px' } }}>
                <Skeleton height={180} borderRadius={12} />
                <Stack direction="row" spacing={1} mt={1}>
                  <Skeleton circle width={40} height={40} />
                  <Box flex={1}>
                    <Skeleton count={2} height={15} />
                    <Skeleton width="60%" height={12} />
                  </Box>
                </Stack>
              </Box>
            ))
          ) : (
            // Yahan aap apna Video Card component use kar sakte ho
            <Typography color="gray">Subscribed channels ki videos yahan dikhengi...</Typography>
          )}
        </Stack>
      </Box>
    </SkeletonTheme>
  );
};

export default SubscriptionPage;

