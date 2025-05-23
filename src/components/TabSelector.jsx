import { memo } from "react";
import PropTypes from "prop-types";

const TabSelector = memo(({ features, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 w-full">
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onTabChange(feature.id)}
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
          {feature.badge && (
            <span className="px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full hidden sm:inline-block">
              {feature.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
});

TabSelector.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      badge: PropTypes.string,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

TabSelector.displayName = "TabSelector";

export default TabSelector;
