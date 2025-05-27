import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-50 via-purple-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo container with minimal effects */}
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
            <img
              src={assets.favicon}
              alt="ImageCraft Logo"
              width="40"
              height="40"
              className="w-10 h-10"
              fetchPriority="high"
            />
          </div>
        </motion.div>

        {/* Text with gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            ImageCraft
          </h1>
        </motion.div>

        {/* Loading indicator - simplified */}
        <div className="mt-4 w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 0.8,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
