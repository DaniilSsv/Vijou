import React, { useState, useEffect } from 'react';
import HLSPlayer from './BetterHLSPlayer';
import { Divider, Input } from 'antd';

const StreamList = ({ streams }) => {
  const [streamURLs, setStreamURLs] = useState([]);

  useEffect(() => {
    setStreamURLs(streams.map(stream => stream.url));
  }, [streams]);

  const handleURLChange = (index, url) => {
    const newStreamURLs = [...streamURLs];
    newStreamURLs[index] = url;
    setStreamURLs(newStreamURLs);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {streamURLs.map((url, index) => (
        <div key={index} style={{ margin: '20px' }}>
          <h2>Stream {index + 1}</h2>
          <Input
            placeholder={`Stream URL ${index + 1}`}
            value={url}
            onChange={(e) => handleURLChange(index, e.target.value)}
          />
          <Divider />
          {url && <HLSPlayer url={url} />}
        </div>
      ))}
    </div>
  );
};

export default StreamList;
