import { memo } from "react";
import PropTypes from "prop-types";

const ImageDisplay = memo(
  ({ image, uploadedImage, alt, loading, placeholder }) => {
    return (
      <div className="relative overflow-hidden rounded-xl shadow-xl bg-gray-100 flex items-center justify-center border border-gray-200">
        {placeholder ? (
          <div className="text-center p-4 sm:p-8">
            <svg
              className="w-12 h-12 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-3 sm:mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            {placeholder}
          </div>
        ) : (
          <img
            className={`object-contain max-h-[90vh] ${
              uploadedImage
                ? "border-2 border-blue-300 shadow-lg p-1 rounded-lg"
                : ""
            }`}
            src={image}
            alt={alt}
          />
        )}
        <span
          className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 ${
            loading ? "w-full transition-all duration-[10s]" : "w-0"
          }`}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4 font-medium text-sm sm:text-base">
                Processing your image...
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ImageDisplay.propTypes = {
  image: PropTypes.string.isRequired,
  uploadedImage: PropTypes.object,
  alt: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  placeholder: PropTypes.node,
};

ImageDisplay.displayName = "ImageDisplay";

export default ImageDisplay;
