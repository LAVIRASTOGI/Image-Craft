import { useContext, useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";

const Result = () => {
  const [searchParams] = useSearchParams();
  const featureActive = searchParams.get("feature") || "generate";
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [image, setImage] = useState(assets.sample_img_1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(featureActive);

  const { generateImage, removeBackground, tonizeImage } =
    useContext(AppContext);

  const features = [
    {
      id: "generate",
      title: "Text to Image",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
        </svg>
      ),
    },
    {
      id: "removeBackground",
      title: "Remove Background",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    {
      id: "tonizeImage",
      title: "Image Tonizer",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (activeTab === "generate" && input) {
      const generatedImage = await generateImage(input);
      console.log(generatedImage);
      if (generatedImage) {
        setIsImageLoaded(true);
        setImage(generatedImage);
      }
    } else if (activeTab === "removeBackground" && uploadedImage) {
      const processedImage = await removeBackground(uploadedImage);
      if (processedImage) {
        setIsImageLoaded(true);
        setImage(processedImage);
      }
    } else if (activeTab === "tonizeImage" && uploadedImage) {
      const processedImage = await tonizeImage(uploadedImage);
      if (processedImage) {
        setIsImageLoaded(true);
        setImage(processedImage);
      }
    }

    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const resetForm = useCallback(() => {
    setIsImageLoaded(false);
    setInput("");
    setUploadedImage(null);
    if (activeTab === "removeBackground" || activeTab === "tonizeImage") {
      setImage(assets.sample_img_2);
    } else {
      setImage(assets.sample_img_1);
    }
  }, [activeTab]);

  useEffect(() => {
    console.log(featureActive);
    setActiveTab(featureActive);
  }, [featureActive]);

  useEffect(() => {
    resetForm();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    // setActiveTab(tab);
    // setSearchParams({ feature: tab });
    navigate(`/result?feature=${tab}`);
  };

  const downloadImageHandler = (e, imageUrl) => {
    e.stopPropagation();
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `imagecraft-${
          activeTab === "generate"
            ? "generated"
            : activeTab === "removeBackground"
            ? "nobg"
            : "tonized"
        }-${Date.now()}.png`;

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("Download failed:", err));
  };

  return (
    <div className="relative min-h-screen pt-16 sm:pt-24 pb-10 px-4 sm:px-6">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        className="flex flex-col items-center max-w-5xl mx-auto"
        initial={{ opacity: 0.2, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent px-2">
          {activeTab === "generate"
            ? "Create Images from Text"
            : activeTab === "removeBackground"
            ? "Remove Image Background"
            : "Adjust Image Tones"}
        </h1>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 w-full">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleTabChange(feature.id)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-sm sm:text-base ${
                activeTab === feature.id
                  ? "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span
                className={
                  activeTab === feature.id ? "text-white" : "text-blue-600"
                }
              >
                {feature.icon}
              </span>
              <span className="truncate">{feature.title}</span>
              {feature.id === "tonizeImage" && (
                <span className="px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full hidden sm:inline-block">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="w-full">
          <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6 sm:mb-8 w-full mx-auto">
                <div className="relative overflow-hidden rounded-xl shadow-xl aspect-[16/10] bg-gray-100 flex items-center justify-center border border-gray-200">
                  {!uploadedImage &&
                  !isImageLoaded &&
                  (activeTab === "removeBackground" ||
                    activeTab === "tonizeImage") ? (
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
                      <p className="text-gray-500 text-sm sm:text-lg">
                        Upload an image to{" "}
                        {activeTab === "removeBackground"
                          ? "remove its background"
                          : "adjust its tones"}
                      </p>
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-contain max-h-[70vh]"
                      src={image}
                      alt={
                        activeTab === "generate"
                          ? "Generated image"
                          : "Image for processing"
                      }
                    />
                  )}
                  <span
                    className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 ${
                      loading ? "w-full transition-all duration-[10s]" : "w-0"
                    }`}
                  />
                </div>

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

              {!isImageLoaded && activeTab === "generate" && (
                <div className="w-full mx-auto">
                  <div className="relative flex flex-col ">
                    <input
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      className="w-full pl-4 sm:pl-5 pr-4 sm:pr-32 py-3 sm:py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-inner text-sm sm:text-base"
                      type="text"
                      placeholder="Describe what you want to generate..."
                    />
                    <button
                      type="submit"
                      className="sm:absolute sm:right-2 sm:top-1/2 sm:transform sm:-translate-y-1/2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500
                       text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
                       hover:shadow-lg transition-all text-sm sm:text-base mt-3 sm:mt-0 w-full sm:w-auto"
                      disabled={loading || !input}
                    >
                      Generate
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    {[
                      "A sunset over mountains",
                      "Futuristic city",
                      "Underwater scene",
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setInput(prompt)}
                        className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isImageLoaded &&
                (activeTab === "removeBackground" ||
                  activeTab === "tonizeImage") && (
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
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
                          onChange={handleImageUpload}
                        />
                      </label>

                      {uploadedImage && (
                        <button
                          type="submit"
                          className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                          disabled={loading}
                        >
                          {activeTab === "removeBackground"
                            ? "Remove Background"
                            : "Adjust Tones"}
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
                )}
            </form>
            {isImageLoaded && (
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center mt-4 sm:mt-6">
                <button
                  type="button"
                  onClick={resetForm}
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
                  {activeTab === "generate"
                    ? "Generate Another"
                    : "Process Another"}
                </button>
                <button
                  onClick={(e) => downloadImageHandler(e, image)}
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
            )}
          </div>

          {/* Feature description cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 feature-card">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                Text to Image
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Transform your text descriptions into stunning visuals using our
                advanced AI models. Just type and watch the magic happen.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 feature-card">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                Remove Background
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Instantly remove backgrounds from any image with perfect edge
                detection. Perfect for product photos, portraits, and more.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 feature-card">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                Image Tonizer
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Enhance and adjust the tones of your images with our advanced AI
                technology. Perfect for creative photo editing and enhancement.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
