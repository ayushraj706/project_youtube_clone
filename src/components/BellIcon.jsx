import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { NotificationsNone, NotificationsActive } from '@mui/icons-material';
import { db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const BellIcon = ({ channelDetail }) => {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [docId, setDocId] = useState(null); // Unsubscribe karne ke liye ID
  const userEmail = localStorage.getItem('userEmail');
  const channelId = channelDetail?.id?.channelId || channelDetail?.id || id;

  // 1. Check status on mount: Kya user pehle se subscribed hai?
  useEffect(() => {
    const checkStatus = async () => {
      if (!userEmail || !channelId) return;
      const q = query(collection(db, "subscriptions"), 
                where("userEmail", "==", userEmail), 
                where("channelId", "==", channelId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setIsSubscribed(true);
        setDocId(snapshot.docs[0].id); // Document ID save karlo delete karne ke liye
      } else {
        setIsSubscribed(false);
      }
    };
    checkStatus();
  }, [userEmail, channelId]);

  const handleToggleSubscribe = async () => {
    if (!userEmail) return alert("Bhai, pehle login toh kar lo!");
    if (!channelId) return alert("Channel ID nahi mil rahi!");

    try {
      if (isSubscribed) {
        // UNSUBSCRIBE LOGIC
        await deleteDoc(doc(db, "subscriptions", docId));
        setIsSubscribed(false);
        setDocId(null);
        alert("Unsubscribed! 🔕");
      } else {
        // SUBSCRIBE LOGIC (With proper Name and Avatar)
        const newSub = {
          userEmail,
          channelId,
          channelName: channelDetail?.snippet?.title || "Unknown Channel",
          channelAvatar: channelDetail?.snippet?.thumbnails?.high?.url || channelDetail?.snippet?.thumbnails?.default?.url || "",
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
