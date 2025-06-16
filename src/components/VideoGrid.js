import React from 'react';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos, onVideoClick }) {
  return (
    <div className="video-grid">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} onClick={() => onVideoClick(v)}/>
      ))}
    </div>
  );
}
