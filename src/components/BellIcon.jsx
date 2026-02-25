import React from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const BellIcon = ({ channelDetail }) => {
  const userEmail = localStorage.getItem('userEmail');

  const handleSubscribe = async () => {
    if (!userEmail) return alert("Bhai, pehle login toh kar lo!");

    try {
      // 1. Channel ID nikalna
      const channelId = channelDetail?.id?.channelId || channelDetail?.id;
      
      // 2. Check karna ki pehle se sub hai ya nahi
      const q = query(collection(db, "subscriptions"), 
                where("userEmail", "==", userEmail), 
                where("channelId", "==", channelId));
      
      const checkSub = await getDocs(q);
      if (!checkSub.empty) return alert("Ye channel pehle se subscribed hai!");

      // 3. Data save karna
      await addDoc(collection(db, "subscriptions"), {
        userEmail: userEmail,
        channelId: channelId,
        channelName: channelDetail?.snippet?.title || "Unknown Channel",
        channelAvatar: channelDetail?.snippet?.thumbnails?.high?.url || "",
        subscribedAt: new Date()
      });

      alert("🔔 Ghanti baj gayi! Ab ye aapki subscription list mein dikhega.");
    } catch (error) {
      console.error("Firebase Details:", error);
      // 👇 YE LINE ASLI SACH BATAYEGI 👇
      alert("Firebase Error Code: " + error.code + "\nMessage: " + error.message);
    }
  };

  return (
    <IconButton onClick={handleSubscribe} sx={{ color: '#FF1100' }}>
      <NotificationsNone />
    </IconButton>
  );
};

export default BellIcon;
