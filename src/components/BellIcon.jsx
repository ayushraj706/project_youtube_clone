import React from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom'; // Naya import URL ke liye

const BellIcon = ({ channelDetail }) => {
  const { id } = useParams(); // URL se ID nikalna (Master fallback)
  const userEmail = localStorage.getItem('userEmail');

  const handleSubscribe = async () => {
    if (!userEmail) return alert("Bhai, pehle login toh kar lo!");

    // ID nikalne ka sabse pakka tarika:
    // 1. Pehle channelDetail se dhoondho
    // 2. Agar wahan nahi hai, toh seedha URL wali 'id' use karo
    const channelId = channelDetail?.id?.channelId || channelDetail?.id || id;

    if (!channelId) {
      console.log("Debug - Channel Data:", channelDetail);
      return alert("Channel ID abhi bhi nahi mil rahi!");
    }

    try {
      const q = query(
        collection(db, "subscriptions"), 
        where("userEmail", "==", userEmail), 
        where("channelId", "==", channelId)
      );
      
      const checkSub = await getDocs(q);
      if (!checkSub.empty) return alert("Ye channel pehle se subscribed hai!");

      await addDoc(collection(db, "subscriptions"), {
        userEmail: userEmail,
        channelId: channelId,
        channelName: channelDetail?.snippet?.title || "Unknown Channel",
        channelAvatar: channelDetail?.snippet?.thumbnails?.high?.url || "",
        subscribedAt: new Date()
      });

      alert("🔔 Ghanti baj gayi! Ab list mein dikhega.");
    } catch (error) {
      alert("Firebase Error: " + error.code);
    }
  };

  return (
    <IconButton onClick={handleSubscribe} sx={{ color: '#FF1100' }}>
      <NotificationsNone />
    </IconButton>
  );
};

export default BellIcon;
