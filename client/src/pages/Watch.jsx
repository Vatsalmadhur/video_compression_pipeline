import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Watch() {
  const { hash } = useParams();
  const [video, setVideo] = useState(null);
  const [quality, setQuality] = useState("360p");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("http://localhost:4000/videos/list");
        const matched = res.data.find((v) => v.hash === hash);
        setVideo(matched);
      } catch (err) {
        console.error("Failed to fetch video data", err);
      }
    };

    fetchVideo();
  }, [hash]);

  if (!video) {
    return <div className="p-4">Loading video...</div>;
  }

  const videoURL = `http://localhost:4000/videos/watch?v=${hash}${
    quality === "original" ? "" : `&res=${quality}`
  }`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link
        to="/"
        className="text-[var(--pink-dark)] underline text-sm mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <video
        key={videoURL} // forces re-render on quality change
        controls
        width="100%"
        className="rounded shadow-md"
      >
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-2xl font-semibold mb-4 mt-2">{video.originalName}</h1>

      <div className="mb-4 p-4 min-h-[200px] rounded-md bg-[var(--pink-light)]">
        <p className="text-lg font-semibold">Video settings</p>
        <div className="flex items-center space-x-3 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Select Quality:
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="original">Original</option>
            <option value="144p">144p</option>
            <option value="240p">240p</option>
            <option value="360p">360p</option>
          </select>
        </div>
      </div>
    </div>
  );
}
