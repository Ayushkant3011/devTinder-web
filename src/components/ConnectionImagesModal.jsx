import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ConnectionImagesModal = ({ user, onClose }) => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetchImages();
  }, [user]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        BASE_URL + "/images/view/" + user._id,
        {
          withCredentials: true
        }
      );

      setImages(res.data.images);

    } catch (err) {
      console.log(err);
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  const isVideo = (url) => {
    return (
      /\.(mp4|webm|ogg|mov)$/i.test(url) ||
      url.includes("/video/")
    );
  };

  const goNext = () => {
    setLightboxIndex(
      (prev) => (prev + 1) % images.length
    );
  };

  const goPrev = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  useEffect(() => {

    const handleKey = (e) => {

      if (lightboxIndex === null) return;

      if (e.key === "Escape") {
        setLightboxIndex(null);
      }

      if (e.key === "ArrowRight") {
        goNext();
      }

      if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };

  }, [lightboxIndex, images]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >

      <div
        className="bg-base-200 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName}'s Images
            </h2>

            <p className="text-sm opacity-60">
              {images.length} {images.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            className="btn btn-circle btn-sm"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20 opacity-60">
            <p className="text-xl">
              No images available
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && !error && images.length > 0 && (

          <div className="flex flex-wrap gap-6 justify-center">

            {images.map((img, index) => (

              <div
                key={img.publicId}
                className="hover-3d cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >

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

                {/* DaisyUI 3D effect */}
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

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (

        <div
          className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >

          <div
            className="relative flex items-center gap-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Previous */}
            <button
              className="btn btn-circle btn-lg text-white border-white hover:bg-white/20"
              onClick={goPrev}
            >
              ❮
            </button>

            {/* Image / Video */}
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

              {/* Close */}
              <button
                className="absolute top-3 right-3 btn btn-sm btn-circle bg-black/50 text-white border-none hover:bg-black/80"
                onClick={() => setLightboxIndex(null)}
              >
                ✕
              </button>

            </div>

            {/* Next */}
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

export default ConnectionImagesModal;