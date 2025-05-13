import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <div className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl leading-10 font-bold  bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          How ImageCraft Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our powerful AI tools are designed to help designers, developers, and
          content creators bring their vision to life with just a few clicks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {stepsData.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Step number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
              {index + 1}
            </div>

            {/* Step card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 pt-10 border border-gray-100 h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <img src={step.icon} alt={step.title} className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>

              {/* User type badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {index === 0 && (
                  <>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      All Users
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                      Multiple Tools
                    </span>
                  </>
                )}
                {index === 1 && (
                  <>
                    <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs rounded-full">
                      Designers
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full">
                      Developers
                    </span>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs rounded-full">
                      Content Creators
                    </span>
                  </>
                )}
                {index === 2 && (
                  <>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                      Professional Results
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
                      Instant Download
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Connector line (only for first two steps) */}
            {index < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
          Get Started Now
        </button>
        <p className="text-gray-500 mt-4">
          No credit card required to try our basic features
        </p>
      </motion.div>
    </div>
  );
};

export default Steps;
