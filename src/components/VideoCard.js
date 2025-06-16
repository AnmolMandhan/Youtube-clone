import React from "react";
import { Link } from "react-router-dom";
import "./videocard.css";

function VideoCard({ video }) {
  const { thumbnails, title, channelTitle } = video.snippet;
  const videoId = video.id.videoId;

  return (
    <Link to={`/watch/${videoId}`} className="video-card">
      <img src={thumbnails.medium.url} alt={title} />
      <div className="video-info">
        <h4>{title}</h4>
        <p>{channelTitle}</p>
      </div>
    </Link>
  );
}

export default VideoCard;
