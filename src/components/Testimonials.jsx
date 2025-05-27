import { testimonialsData, assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <div className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover how ImageCraft is helping professionals across India
          transform their creative workflows and achieve stunning results.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>

            <div className="flex flex-col items-center mt-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  width="80"
                  height="80"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-2">
                {item.role}
              </p>

              <div className="flex items-center mb-4">
                {[...Array(item.stars)].map((_, i) => (
                  <img
                    key={i}
                    src={assets.rating_star}
                    alt="star"
                    className="w-5 h-5"
                    width="20"
                    height="20"
                  />
                ))}
              </div>

              <p className="text-gray-600 text-center italic">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  Verified User
                </span>
                {item.role === "UI/UX Designer" && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                    Design Pro
                  </span>
                )}
                {item.role === "Full Stack Developer" && (
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                    Tech Expert
                  </span>
                )}
                {item.role === "Content Creator" && (
                  <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs rounded-full">
                    Creator
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-600 mb-6">
          Join thousands of satisfied users across India
        </p>
        <button className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
          Try ImageCraft Today
        </button>
      </motion.div>
    </div>
  );
};

export default Testimonials;
