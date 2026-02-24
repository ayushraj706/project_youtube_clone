import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, title, thumbnailUrl, onVideoEnd }) => {

  useEffect(() => {
    // Lock Screen Controls (Media Session API)
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || 'Video Playing',
        artist: 'Success Point Hub',
        artwork: [
          { src: thumbnailUrl || 'https://via.placeholder.com/512', sizes: '512x512', type: 'image/png' }
        ]
      });

      // Lock screen par 'Next' button dabane par kya ho
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        onVideoEnd();
      });

      // Lock screen par 'Previous' button ke liye
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        console.log('Previous Video');
      });
    }
  }, [title, thumbnailUrl, onVideoEnd]);

  return (
    <div className="player-wrapper" style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer
        url={videoUrl}
        className="react-player"
        playing={true}        // Automatic play
        controls={true}       // Video controls
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        onEnded={onVideoEnd}  // Jab video khatam ho toh auto-next chale
      />
    </div>
  );
};

export default VideoPlayer;

