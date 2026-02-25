import React, { useState } from 'react';
import { IconButton, Tooltip, Typography, Stack } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
// Dhyan rahe: firebase.js ka rasta sahi ho
import { db } from '../firebase'; 

const BellIcon = ({ channelId, channelTitle }) => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    // Check karo ki user login hai ya nahi
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert("Bhai, pehle login kar lo!");

    try {
      // Firebase mein is student ke account mein ye channel jodd do
      const userRef = doc(db, "users", userEmail);
      await updateDoc(userRef, {
        subscribedChannels: arrayUnion(channelId)
      });
      
      setSubscribed(true);
      alert(`🔔 Ghanti baj gayi! Ab ${channelTitle} ke naye video ka notification aayega.`);
      
      // Push Notification ke liye Permission maango (Browser pop-up)
      requestNotificationPermission();

    } catch (error) {
      console.error(error);
      alert("Database mein save nahi hua, Firebase Rules check karo.");
    }
  };

  // Browser se notification bhejne ki ijazat mangna
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log("Notification permission mil gayi!");
          // Asli push notification ka token hum aage set karenge
        }
      });
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} 
           sx={{ bgcolor: '#272727', px: 2, py: 0.5, borderRadius: '20px', cursor: 'pointer' }}
           onClick={handleSubscribe}>
      <Tooltip title={subscribed ? "Subscribed" : "Subscribe for Notifications"}>
        <IconButton sx={{ color: subscribed ? '#FF1100' : 'white', p: 0.5 }}>
          {subscribed ? <NotificationsActiveIcon /> : <NotificationsNoneIcon />}
        </IconButton>
      </Tooltip>
      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
        {subscribed ? "Subscribed" : "Subscribe"}
      </Typography>
    </Stack>
  );
};

export default BellIcon;

