import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import ImageDisplay from "../components/ImageDisplay";
import TabSelector from "../components/TabSelector";
import ImageUploader from "../components/ImageUploader";
import TextPromptForm from "../components/TextPromptForm";
import ImageControls from "../components/ImageControls";
import FeatureCard from "../components/FeatureCard";

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

  const features = useMemo(
    () => [
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
        badge: "New",
      },
    ],
    []
  );

  const featureCards = useMemo(
    () => [
      {
        title: "Text to Image",
        description:
          "Transform your text descriptions into stunning visuals using our advanced AI models. Just type and watch the magic happen.",
        icon: (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
          </svg>
        ),
        iconBgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: "Remove Background",
        description:
          "Instantly remove backgrounds from any image with perfect edge detection. Perfect for product photos, portraits, and more.",
        icon: (
          <svg
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
        iconBgColor: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        title: "Image Tonizer",
        description:
          "Enhance and adjust the tones of your images with our advanced AI technology. Perfect for creative photo editing and enhancement.",
        icon: (
          <svg
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
        iconBgColor: "bg-pink-100",
        iconColor: "text-pink-600",
      },
    ],
    []
  );

  const samplePrompts = useMemo(
    () => ["A sunset over mountains", "Futuristic city", "Underwater scene"],
    []
  );

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      if (activeTab === "generate" && input) {
        const generatedImage = await generateImage(input);
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
    },
    [
      activeTab,
      generateImage,
      input,
      removeBackground,
      tonizeImage,
      uploadedImage,
    ]
  );

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setImage(URL.createObjectURL(file));
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

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

  const handleTabChange = useCallback(
    (tab) => {
      navigate(`/result?feature=${tab}`);
    },
    [navigate]
  );

  const downloadImageHandler = useCallback(
    (e) => {
      e.stopPropagation();
      fetch(image)
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
    },
    [activeTab, image]
  );

  useEffect(() => {
    setActiveTab(featureActive);
  }, [featureActive]);

  useEffect(() => {
    resetForm();
  }, [activeTab, resetForm]);

  const pageTitle = useMemo(() => {
    return activeTab === "generate"
      ? "Create Images from Text"
      : activeTab === "removeBackground"
      ? "Remove Image Background"
      : "Adjust Image Tones";
  }, [activeTab]);

  const imagePlaceholder = useMemo(() => {
    if (
      !uploadedImage &&
      !isImageLoaded &&
      (activeTab === "removeBackground" || activeTab === "tonizeImage")
    ) {
      return (
        <p className="text-gray-500 text-sm sm:text-lg">
          Upload an image to{" "}
          {activeTab === "removeBackground"
            ? "remove its background"
            : "adjust its tones"}
        </p>
      );
    }
    return null;
  }, [activeTab, isImageLoaded, uploadedImage]);

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
          {pageTitle}
        </h1>

        {/* Feature Tabs */}
        <TabSelector
          features={features}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="w-full">
          <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col items-center"
            >
              <div className="relative mb-6 sm:mb-8 w-full mx-auto">
                <ImageDisplay
                  image={image}
                  uploadedImage={uploadedImage}
                  alt={
                    activeTab === "generate"
                      ? "Generated image"
                      : "Image for processing"
                  }
                  loading={loading}
                  placeholder={imagePlaceholder}
                />
              </div>

              {!isImageLoaded && activeTab === "generate" && (
                <TextPromptForm
                  input={input}
                  onInputChange={handleInputChange}
                  onSubmit={onSubmitHandler}
                  loading={loading}
                  samplePrompts={samplePrompts}
                />
              )}

              {!isImageLoaded &&
                (activeTab === "removeBackground" ||
                  activeTab === "tonizeImage") && (
                  <ImageUploader
                    onImageUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                    onSubmit={onSubmitHandler}
                    loading={loading}
                    actionText={
                      activeTab === "removeBackground"
                        ? "Remove Background"
                        : "Adjust Tones"
                    }
                  />
                )}
            </form>

            {isImageLoaded && (
              <ImageControls
                onReset={resetForm}
                onDownload={downloadImageHandler}
                activeTab={activeTab}
              />
            )}
          </div>

          {/* Feature description cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {featureCards.map((card, index) => (
              <FeatureCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                iconBgColor={card.iconBgColor}
                iconColor={card.iconColor}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
