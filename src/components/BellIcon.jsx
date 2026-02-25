import React from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const BellIcon = ({ channelDetail }) => {
  const handleSubscribe = async () => {
    // 1. Email check karein
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert("Bhai, pehle login toh kar lo! Email nahi mil raha.");

    // 2. Channel ID nikalne ka pakka tarika (Har page ke liye)
    // Channel Detail page par 'id' hota hai, Search page par 'id.channelId'
    const channelId = channelDetail?.id?.channelId || channelDetail?.id;

    // 3. Agar ID phir bhi nahi mili toh error dikhao (Query chalne se pehle)
    if (!channelId) {
      console.log("Channel Data:", channelDetail);
      return alert("Channel ID nahi mil rahi hai!");
    }

    try {
      // 4. Ab query safe hai kyunki humne upar check kar liya hai
      const q = query(
        collection(db, "subscriptions"), 
        where("userEmail", "==", userEmail), 
        where("channelId", "==", channelId)
      );
      
      const checkSub = await getDocs(q);
      if (!checkSub.empty) return alert("Bhai, ye pehle se subscribe hai!");

      // 5. Data save karna
      await addDoc(collection(db, "subscriptions"), {
        userEmail: userEmail,
        channelId: channelId,
        channelName: channelDetail?.snippet?.title || "Unknown Channel",
        channelAvatar: channelDetail?.snippet?.thumbnails?.high?.url || channelDetail?.snippet?.thumbnails?.default?.url || "",
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
