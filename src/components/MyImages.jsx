import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const MyImages = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, images]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/images/view", {
        withCredentials: true,
      });
      setImages(res.data.images);
    } catch (err) {
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4.6 * 1024 * 1024) {
      setError("File too large. Max size is 4.6MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    setError("");

    try {
      const res = await axios.post(BASE_URL + "/images/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [...prev, res.data.image]);
    } catch (err) {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (publicId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(BASE_URL + `/images/${publicId}`, {
        withCredentials: true,
      });
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      if (lightboxIndex !== null && images[lightboxIndex]?.publicId === publicId) {
        setLightboxIndex(null);
      }
    } catch (err) {
      setError("Delete failed. Try again.");
    }
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/video/');
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button className="btn btn-ghost" onClick={() => navigate('/profile')}>
          ← Back
        </button>
        <h1 className="text-2xl font-bold">My Images</h1>
      </div>

      {/* Upload Button */}
      <label className={`btn btn-primary mb-6 cursor-pointer ${uploading ? "btn-disabled" : ""}`}>
        {uploading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Uploading...
          </>
        ) : "+ Upload New Image / Video"}
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>

      {/* Error */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>

      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 opacity-50">
          <p className="text-xl">No images yet</p>
          <p className="text-sm mt-1">Upload your first image or video above</p>
        </div>

      ) : (
        /* 3D Hover Gallery Grid */
        <div className="flex flex-wrap gap-6">
          {images.map((img, index) => (
            <div
              key={img.publicId}
              className="hover-3d relative cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Image / Video fills the card fully */}
              <figure className="w-60 h-72 rounded-2xl overflow-hidden">
                {isVideo(img.url) ? (
                  <video
                    src={img.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={img.url}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                )}
              </figure>

              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(img.publicId, e)}
                className="absolute top-2 right-2 btn btn-xs btn-error opacity-0 group-hover:opacity-100 z-10"
              >
                ✕
              </button>

              {/* Required 8 empty divs for DaisyUI 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex items-center gap-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              className="btn btn-circle btn-lg text-white border-white hover:bg-white/20"
              onClick={goPrev}
            >
              ❮
            </button>

            {/* Image or Video */}
            <div className="relative">
              {isVideo(images[lightboxIndex]?.url) ? (
                <video
                  src={images[lightboxIndex]?.url}
                  className="max-h-[80vh] max-w-[70vw] rounded-2xl shadow-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={images[lightboxIndex]?.url}
                  alt="preview"
                  className="max-h-[80vh] max-w-[70vw] rounded-2xl object-contain shadow-2xl"
                />
              )}

              {/* Counter */}
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {images.length}
              </p>

              {/* Close button */}
              <button
                className="absolute top-3 right-3 btn btn-sm btn-circle bg-black/50 text-white border-none hover:bg-black/80"
                onClick={() => setLightboxIndex(null)}
              >
                ✕
              </button>
            </div>

            {/* Next Button */}
            <button
              className="btn btn-circle btn-lg text-white border-white hover:bg-white/20"
              onClick={goNext}
            >
              ❯
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyImages;