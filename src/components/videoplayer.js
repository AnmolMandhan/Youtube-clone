
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoCard from "./VideoCard";
import "./videoplayer.css";

const API_KEY = "your api key"; // Replace with your key

const fallbackVideos = [
  {
    id: { videoId: "dQw4w9WgXcQ" },
    snippet: {
      title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
      channelTitle: "Rick Astley",
      thumbnails: {
        medium: {
          url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        },
      },
    },
  },
  {
    id: { videoId: "3JZ_D3ELwOQ" },
    snippet: {
      title: "Charlie Puth - Attention [Official Video]",
      channelTitle: "Charlie Puth",
      thumbnails: {
        medium: {
          url: "https://i.ytimg.com/vi/nfs8NYg7yQM/mqdefault.jpg",
        },
      },
    },
  },
  {
    id: { videoId: "L_jWHffIx5E" },
    snippet: {
      title: "Smash Mouth - All Star (Official Music Video)",
      channelTitle: "Smash Mouth",
      thumbnails: {
        medium: {
          url: "https://i.ytimg.com/vi/L_jWHffIx5E/mqdefault.jpg",
        },
      },
    },
  },
];

export default function VideoPlayer() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/commentThreads",
          {
            params: {
              part: "snippet",
              videoId,
              maxResults: 20,
              key: API_KEY,
            },
          }
        );
        setComments(res.data.items);
      } catch (err) {
        console.error(err);
        setError("Unable to load comments.");
      } finally {
        setLoadingComments(false);
      }
    }

    async function fetchRelatedVideos() {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              relatedToVideoId: videoId,
              type: "video",
              maxResults: 10,
              key: API_KEY,
              regionCode: "US",
              safeSearch: "strict",
            },
          }
        );
        if (res.data.items.length === 0) {
          setRelatedVideos(fallbackVideos);
        } else {
          setRelatedVideos(res.data.items);
        }
      } catch (err) {
        console.error("Error fetching related videos", err);
        setRelatedVideos(fallbackVideos); // Use fallback
      } finally {
        setLoadingRelated(false);
      }
    }

    fetchComments();
    fetchRelatedVideos();
  }, [videoId]);

  return (
    <div className="video-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <div className="video-content">
        <div className="video-player">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Player"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="related-section">
          <h3>Related Videos</h3>
          {loadingRelated && <p>Loading...</p>}
          <div className="related-grid">
            {relatedVideos.map((video) => (
              <VideoCard key={video.id.videoId || video.id} video={video} />
            ))}
          </div>
        </div>
      </div>

      <section className="comments">
        <h3>Comments</h3>
        {loadingComments && <p>Loading comments…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loadingComments && !error && comments.length === 0 && (
          <p>No comments on this video.</p>
        )}
        <ul>
          {comments.map((c) => {
            const top = c.snippet.topLevelComment.snippet;
            return (
              <li key={c.id}>
                <strong>{top.authorDisplayName}</strong>: {top.textDisplay}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
