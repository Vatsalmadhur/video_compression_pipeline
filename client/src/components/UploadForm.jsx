import React from "react";
import { useState, useRef } from "react";
import axiosUploadClient from "../utils/axiosUploadClient";
export default function UploadForm({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length) {
      handleUpload(droppedFiles[0]);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    try {
      setUploading(true);
      const res = await axiosUploadClient.post("/videos/upload", formData);
      onUploadSuccess(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div
      className={`w-full border-2 border-[var(--pink-dark)] h-[250px] flex items-center justify-center border-dashed rounded-lg p-6 text-center cursor-pointer ${
        uploading ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={() => fileInputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {uploading ? (
        <p className="text-gray-600">Uploading...</p>
      ) : (
        <div>
          <p className="font-semibold text-gray-700">
            Drag and drop a video file here to upload
          </p>
          <p className="text-sm text-gray-700">Or, browse from your device.</p>
          <button className="mt-2 bg-[var(--pink-light)] py-1 px-3 text-sm rounded-md ">
            Browse Files
          </button>
          <p className="text-sm text-gray-500 mt-1">
            Supported: .mp4, .mov, etc.
          </p>
        </div>
      )}
    </div>
  );
}
