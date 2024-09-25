import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StreamList from './components/StreamList';
import { Button } from 'antd';

const App = () => {
  const [streams, setStreams] = useState([
    { id: 1, url: 'http://localhost:8000/live/stream1/index.m3u8' },
    { id: 2, url: 'http://localhost:8000/live/stream2/index.m3u8' },
    { id: 3, url: 'http://localhost:8000/live/stream3/index.m3u8' },
  ]);

  const addStream = () => {
    const newStream = { id: streams.length + 1, url: '' };
    setStreams([...streams, newStream]);
  };

  return (
    <div className="App">
      <Header />
      <h1>Recommended Streams</h1>
      <StreamList streams={streams} />
      <Button type="primary" onClick={addStream} style={{ marginTop: '20px' }}>
        Add Stream
      </Button>
    </div>
  );
};

export default App;
