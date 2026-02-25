import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone, NotificationsActive } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromAPI'; // API mangwane ke liye

const BellIcon = ({ channelDetail }) => {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [docId, setDocId] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const channelId = channelDetail?.id?.channelId || channelDetail?.id || id;

  useEffect(() => {
    const checkStatus = async () => {
      if (!userEmail || !channelId) return;
      const q = query(collection(db, "subscriptions"), 
                where("userEmail", "==", userEmail), 
                where("channelId", "==", channelId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setIsSubscribed(true);
        setDocId(snapshot.docs[0].id);
      }
    };
    checkStatus();
  }, [userEmail, channelId]);

  const handleToggleSubscribe = async () => {
    if (!userEmail) return alert("Bhai, pehle login toh kar lo!");
    if (!channelId) return alert("Channel ID nahi mil rahi!");

    try {
      if (isSubscribed) {
        await deleteDoc(doc(db, "subscriptions", docId));
        setIsSubscribed(false);
        setDocId(null);
        alert("Unsubscribed! 🔕");
      } else {
        let finalName = channelDetail?.snippet?.title;
        let finalAvatar = channelDetail?.snippet?.thumbnails?.high?.url;

        // PERMANENT EELAJ: Agar data gayab hai, toh API se turant mangwao
        if (!finalName || !finalAvatar) {
          console.log("Data missing, fetching from API...");
          const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
          finalName = data?.items[0]?.snippet?.title;
          finalAvatar = data?.items[0]?.snippet?.thumbnails?.high?.url;
        }

        const newSub = {
          userEmail,
          channelId,
          channelName: finalName || "Unknown Channel",
          channelAvatar: finalAvatar || "",
          subscribedAt: new Date()
        };

        const res = await addDoc(collection(db, "subscriptions"), newSub);
        setDocId(res.id);
        setIsSubscribed(true);
        alert("Subscribed! 🔔");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <IconButton onClick={handleToggleSubscribe} sx={{ color: '#FF1100' }}>
      {isSubscribed ? <NotificationsActive /> : <NotificationsNone />}
    </IconButton>
  );
};

export default BellIcon;
