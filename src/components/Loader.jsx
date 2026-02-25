import React from 'react';
import { Box, Stack } from '@mui/material';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader = () => {
  return (
    // Dark theme ke liye baseColor aur highlightColor set kiya hai
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Box minHeight="95vh" p={2}>
        {/* Isse 6 alag-alag video cards ka skeleton banega */}
        <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Box key={idx} sx={{ width: { xs: '100%', sm: '358px', md: '320px' } }}>
              {/* Video Thumbnail Skeleton */}
              <Skeleton height={180} borderRadius={12} />
              
              <Stack direction="row" spacing={1} mt={1}>
                {/* Channel Icon Skeleton (Gol wala) */}
                <Skeleton circle width={40} height={40} />
                
                <Box flex={1}>
                  {/* Title Skeleton (Do line mein) */}
                  <Skeleton count={2} height={15} />
                  {/* Channel Name Skeleton (Choti line) */}
                  <Skeleton width="60%" height={12} />
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </SkeletonTheme>
  );
};

export default Loader;
