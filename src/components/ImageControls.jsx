import { memo } from "react";
import PropTypes from "prop-types";

const ImageControls = memo(
  ({ onReset, onDownload, resetButtonText, activeTab }) => {
    return (
      <div className="flex gap-3 sm:gap-4 flex-wrap justify-center mt-4 sm:mt-6">
        <button
          type="button"
          onClick={onReset}
          className="bg-white border border-gray-300 text-gray-700 px-5 sm:px-8 py-2 sm:py-3 rounded-full cursor-pointer hover:bg-gray-50 transition-all flex items-center gap-2 text-sm sm:text-base"
        >
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          {resetButtonText ||
            (activeTab === "generate" ? "Generate Another" : "Process Another")}
        </button>
        <button
          onClick={onDownload}
          className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full cursor-pointer hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Download
        </button>
      </div>
    );
  }
);

ImageControls.propTypes = {
  onReset: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  resetButtonText: PropTypes.string,
  activeTab: PropTypes.string,
};

ImageControls.displayName = "ImageControls";

export default ImageControls;
