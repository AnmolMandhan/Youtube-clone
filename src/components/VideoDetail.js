import React from "react";
import "./VideoDetail.css";

export default function VideoDetail({ video, onBack }) {
  const { snippet, id } = video;
  return (
    <div className="detail">
      <button onClick={onBack} className="back-button">← Back</button>
      <div className="video-wrapper">
        <iframe
          title={snippet.title}
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${id.videoId}`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <h2>{snippet.title}</h2>
      <p className="detail-channel">{snippet.channelTitle}</p>
      <p className="detail-desc">{snippet.description}</p>
    </div>
  );
}
