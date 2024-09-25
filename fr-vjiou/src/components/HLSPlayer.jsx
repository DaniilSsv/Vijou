import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const HLSPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [isLive, setIsLive] = useState(true);

  const handleProgress = (state) => {
    if (!state.seeking) {
      setIsLive(true);
    }
  };

  const handleSeek = () => {
    setIsLive(false);
  };

  return (
    <div className="hls-player-wrapper">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={true}
        width="100%"
        height="100%"
        playing={true}
        onProgress={handleProgress}
        onSeek={handleSeek}
        config={{
          lowLatencyMode: true,
          file: {
            hlsOptions: {
              liveSyncDurationCount: 3,
              liveDurationInfinity: true,
            },
          },
        }}
      />
    </div>
  );
};

export default HLSPlayer;