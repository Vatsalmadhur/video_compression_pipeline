import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UploadForm from "../UploadForm";
import Spacer from "../components/Spacer";
import Card from "../components/Card";
export default function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/videos/list");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="max-w-3xl h-auto mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold  text-gray-700 mb-2">Dashboard</h1>
      <p className="text-[var(--pink-dark)] mb-4">
        Manage your uploads and monitor their progress.
      </p>
      <UploadForm onUploadSuccess={fetchVideos} />

      <h2 className="text-xl font-semibold mt-10 mb-2">Recent Uploads</h2>
      <div className="grid gap-3">
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <Link
              to={`/watch/${video.hash}`}
              key={video.hash}
            >
              <Card originalName={video.originalName} status={video.status} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
