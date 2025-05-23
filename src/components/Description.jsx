import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <div className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background elements - adjusted for better mobile appearance */}
      <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent px-2">
            AI-Powered Creative Suite
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2">
            Powerful tools for designers, developers, and content creators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start w-full">
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={assets.sample_img_1}
                className="w-full h-auto object-cover"
                alt="AI-generated image example"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                <span className="text-white text-xs sm:text-sm">
                  Created with ImageCraft AI
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-gray-800">
                  Complete Image Solution for Professionals
                </h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                  ImageCraft combines three powerful AI tools in one platform to
                  supercharge your creative workflow:
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Text to Image Generation
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Perfect for UI/UX designers creating mockups, developers
                        needing custom graphics, and content creators seeking
                        unique visuals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
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
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Background Removal
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Essential for designers creating clean product displays,
                        developers building responsive interfaces, and creators
                        making professional thumbnails.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Try ImageCraft Now</span>
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
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Description;
