import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState("generate");

  const onClickHandler = (feature) => {
    if (user) {
      navigate("/result?feature=" + feature);
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      id: "generate",
      title: "Text to Image",
      description: "Transform your text descriptions into stunning visuals",
      icon: (
        <svg
          className="w-6 h-6"
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
      description: "Instantly remove backgrounds from any image",
      icon: (
        <svg
          className="w-6 h-6"
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
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        className="flex flex-col justify-center items-center text-center my-16 md:my-20 relative z-10"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-stone-500 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-neutral-200 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
            NEW
          </span>
          <p>AI-powered image transformation suite</p>
          <img src={assets.star_icon} alt="" className="w-5 h-5" />
        </motion.div>

        <motion.h1
          className="text-center mx-auto mt-10 text-4xl font-bold max-w-[300px] sm:text-7xl sm:max-w-[800px] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Transform your{" "}
          <span className="underline decoration-wavy decoration-blue-400 decoration-2 underline-offset-4">
            imagination
          </span>{" "}
          into reality
        </motion.h1>

        <motion.p
          className="text-center max-w-2xl mx-auto mt-6 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Unleash the power of AI to create stunning visuals, remove
          backgrounds, and enhance image tones with just a few clicks.
        </motion.p>

        {/* Feature Selection Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                activeFeature === feature.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`${
                  activeFeature === feature.id ? "text-white" : "text-blue-600"
                }`}
              >
                {feature.icon}
              </span>
              <span>{feature.title}</span>
            </div>
          ))}
        </motion.div>

        {/* Feature Description */}
        <motion.div
          className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl max-w-2xl border border-gray-100 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {features.find((f) => f.id === activeFeature)?.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {features.find((f) => f.id === activeFeature)?.description}
          </p>
          <motion.button
            className="w-full sm:w-auto sm:text-lg text-white bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 px-10 py-3 flex items-center justify-center gap-2 rounded-full shadow-lg hover:shadow-blue-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onClickHandler(activeFeature)}
          >
            Try {features.find((f) => f.id === activeFeature)?.title} Now
            <svg
              className="w-5 h-5"
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
          </motion.button>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h3 className="text-xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
            See what our users are creating
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl mx-auto">
            {Array(4)
              .fill("")
              .map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-md aspect-square max-w-[150px] sm:max-w-[200px] md:max-w-none mx-auto"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                >
                  <motion.img
                    className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
                    src={assets[`sample_img_${index + 1}`]}
                    width="300"
                    height="300"
                    sizes="(max-width: 640px) 150px, 300px"
                    alt={`Sample image ${index + 1}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                    <p className="text-white text-xs">
                      Created with ImageCraft
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-blue-600/20 via-purple-500/20 to-pink-500/20 filter blur-xl rounded-full"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
