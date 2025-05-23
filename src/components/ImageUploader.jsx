import { memo } from "react";
import PropTypes from "prop-types";

const ImageUploader = memo(
  ({ onImageUpload, uploadedImage, onSubmit, loading, actionText }) => {
    return (
      <div className="w-full mx-auto">
        <div className="flex flex-col items-center">
          <label className="w-full flex flex-col items-center justify-center h-24 sm:h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6 px-2 sm:px-0">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-blue-600 font-medium text-center">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-blue-500 text-center">
                PNG, JPG or JPEG (MAX. 5MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageUpload}
            />
          </label>

          {uploadedImage && (
            <button
              type="button"
              onClick={onSubmit}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
              disabled={loading}
            >
              {actionText}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  uploadedImage: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  actionText: PropTypes.string.isRequired,
};

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
