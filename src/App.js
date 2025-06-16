
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import VideoCard from "./components/VideoCard";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/videoplayer";
import "./App.css";

const API_KEY = "your api key here"; // Replace with yours

function Home({ category, setCategory }) {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVideos = async (query) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: "snippet",
            q: query,
            key: API_KEY,
            maxResults: 12,
            type: "video"
          }
        }
      );
      setVideos(res.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    const query = category === "All" ? "trending" : category;
    fetchVideos(query);
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchVideos(searchTerm);
      setCategory("Search Results");
    }
  };

  return (
    <>
      <header className="app-header">
        <img
  className="logo"
  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
  alt="YouTube Clone"
/>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>

      <Sidebar category={category} setCategory={setCategory} />

      <main className="main">
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId || video.id.channelId} video={video} />
          ))}
        </div>
      </main>
    </>
  );
}

function App() {
  const [category, setCategory] = useState("All");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home category={category} setCategory={setCategory} />}
        />
        <Route path="/watch/:videoId" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
