import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchSubs = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Firebase se sirf unhi channels ko mangwana jo is user ne sub kiye hain
        const q = query(collection(db, "subscriptions"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        
        // Data nikalna aur check karna ki kachra na ho
        const subsData = querySnapshot.docs
          .map(doc => doc.data())
          .filter(chan => chan.channelName && chan.channelName !== "Unknown Channel"); // Filter junk
          
        setChannels(subsData);
      } catch (error) {
        console.error("Error fetching subs:", error);
      } finally {
        // Professional look ke liye thoda delay
        setTimeout(() => setLoading(false), 1200);
      }
    };

    fetchSubs();
  }, [userEmail]);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Box p={2} sx={{ overflowY: 'auto', height: '92vh', backgroundColor: '#000', color: 'white' }}>
        
        {/* TOP SECTION: Subscribed Channels list */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          All Subscriptions
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2, mb: 3 }}>
          {loading ? (
            // Skeleton jab data load ho raha ho
            Array.from({ length: 6 }).map((_, i) => (
              <Stack key={i} alignItems="center" spacing={1}>
                <Skeleton circle width={65} height={65} />
                <Skeleton width={50} height={10} />
              </Stack>
            ))
          ) : channels.length > 0 ? (
            channels.map((chan, idx) => (
              <Stack key={idx} alignItems="center" spacing={1} sx={{ cursor: 'pointer', minWidth: '75px' }}>
                <Avatar 
                  src={chan.channelAvatar} 
                  sx={{ width: 65, height: 65, border: '2px solid #FF1100' }} 
                />
                <Typography variant="caption" noWrap sx={{ width: '70px', textAlign: 'center' }}>
                  {chan.channelName}
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography variant="body2" color="gray">Abhi tak koi channel subscribe nahi kiya.</Typography>
          )}
        </Stack>

        <hr style={{ borderColor: '#222', marginBottom: '25px' }} />

        {/* LOWER SECTION: Videos (Future Logic) */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Latest from Subscriptions
        </Typography>

        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <Box key={idx} sx={{ width: { xs: '100%', sm: '358px', md: '320px' } }}>
                <Skeleton height={180} borderRadius={12} />
                <Stack direction="row" spacing={1} mt={1}>
                  <Skeleton circle width={40} height={40} />
                  <Box flex={1}>
                    <Skeleton count={2} height={15} />
                  </Box>
                </Stack>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="gray" sx={{ fontStyle: 'italic' }}>
              Subscribed channels ki videos dekhne ke liye upar kisi channel par click karein...
            </Typography>
          )}
        </Stack>
      </Box>
    </SkeletonTheme>
  );
};

export default SubscriptionPage;
