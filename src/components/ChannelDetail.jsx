import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import BellIcon from './BellIcon'; // NAYA: Ghanti wala component import kiya

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);
      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        {/* Aapka Purana Rangeen Banner */}
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        
        {/* NAYA LOGIC: ChannelCard aur BellIcon ko ek saath center karne ke liye Box banaya */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
          
          {/* NAYA CODE: Ye Ghanti sirf tab dikhegi jab channel ka data aa jayega */}
          {channelDetail && (
            <Box mt={-2} mb={2} zIndex={11}>
              <BellIcon 
                channelId={channelDetail?.id} 
                channelTitle={channelDetail?.snippet?.title} 
              />
            </Box>
          )}
        </Box>
        
      </Box>
      
      {/* Aapka Purana Videos wala hissa */}
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
