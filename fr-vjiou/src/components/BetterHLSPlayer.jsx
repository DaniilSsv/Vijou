import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        hls = new Hls({
          liveSyncDuration: 2,  // Set liveSyncDuration instead of liveSyncDurationCount
          liveMaxLatencyDuration: 5,  // Set liveMaxLatencyDuration instead of liveMaxLatencyDurationCount
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }

      video.addEventListener('loadedmetadata', () => {
        video.currentTime = video.duration;
      });

      video.addEventListener('timeupdate', () => {
        if (video.duration - video.currentTime > 3) {
          video.currentTime = video.duration;
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%' }}
      controlsList="nodownload nofullscreen noremoteplayback"
    />
  );
};

export default HLSPlayer;
