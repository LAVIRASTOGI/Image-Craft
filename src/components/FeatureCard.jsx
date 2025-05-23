import { memo } from "react";
import PropTypes from "prop-types";

const FeatureCard = memo(
  ({
    icon,
    title,
    description,
    iconBgColor = "bg-blue-100",
    iconColor = "text-blue-600",
  }) => {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 feature-card">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBgColor} rounded-full flex items-center justify-center mb-3 sm:mb-4`}
        >
          <span className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`}>{icon}</span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
      </div>
    );
  }
);

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string,
};

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
