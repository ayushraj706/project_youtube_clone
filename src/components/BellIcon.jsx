import React from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone, NotificationsActive } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const BellIcon = ({ channelDetail }) => {
  const userEmail = localStorage.getItem('userEmail');

  const handleSubscribe = async () => {
    if (!userEmail) return alert("Bhai, pehle login toh kar lo!");

    try {
      // 1. Pehle check karo ki ye channel pehle se subscribed hai ya nahi
      const q = query(collection(db, "subscriptions"), 
                where("userEmail", "==", userEmail), 
                where("channelId", "==", channelDetail?.id?.channelId || channelDetail?.id));
      
      const checkSub = await getDocs(q);
      if (!checkSub.empty) return alert("Ye channel pehle se subscribed hai!");

      // 2. Naya logic: Name aur Avatar ke saath save karna
      await addDoc(collection(db, "subscriptions"), {
        userEmail: userEmail,
        channelId: channelDetail?.id?.channelId || channelDetail?.id,
        channelName: channelDetail?.snippet?.title || "Unknown Channel",
        channelAvatar: channelDetail?.snippet?.thumbnails?.high?.url || "",
        subscribedAt: new Date()
      });

      alert("🔔 Ghanti baj gayi! Ab ye aapki subscription list mein dikhega.");
    } catch (error) {
      console.error(error);
      alert("Database mein save nahi hua, Firebase Rules check karo.");
    }
  };

  return (
    <IconButton onClick={handleSubscribe} sx={{ color: '#FF1100' }}>
      <NotificationsNone />
    </IconButton>
  );
};

export default BellIcon;
