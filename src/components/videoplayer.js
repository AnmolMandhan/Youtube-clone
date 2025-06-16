import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./videoplayer.css";

const API_KEY = "AIzaSyBC_YCyivopFIx8GrkNRakcbfyqn5Z5FT8";   //  ← same key you use in App.js

export default function VideoPlayer() {
  const { videoId } = useParams();          // route param from “/watch/:videoId”
  const navigate  = useNavigate();

  const [comments, setComments] = useState([]);
  const [loading,  setLoading ] = useState(true);
  const [error,    setError   ] = useState("");

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
            }
          }
        );
        setComments(res.data.items);
      } catch (err) {
        console.error(err);
        setError("Unable to load comments.");
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [videoId]);

  return (
    <div className="video-page">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>

      <div className="video-player">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Player"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <section className="comments">
        <h3>Comments</h3>

        {loading && <p>Loading comments…</p>}
        {error &&   <p style={{color:"red"}}>{error}</p>}

        {!loading && !error && comments.length === 0 && (
          <p>No comments on this video.</p>
        )}

        <ul>
          {comments.map((c) => {
            const top = c.snippet.topLevelComment.snippet;
            return (
              <li key={c.id}>
                <strong>{top.authorDisplayName}</strong>: {top.textDisplay}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
