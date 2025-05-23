import { memo } from "react";
import PropTypes from "prop-types";

const TextPromptForm = memo(
  ({ input, onInputChange, onSubmit, loading, samplePrompts = [] }) => {
    return (
      <div className="w-full mx-auto">
        <div className="relative flex flex-col">
          <input
            onChange={onInputChange}
            value={input}
            className="w-full pl-4 sm:pl-5 pr-4 sm:pr-32 py-3 sm:py-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-inner text-sm sm:text-base"
            type="text"
            placeholder="Describe what you want to generate..."
          />
          <button
            type="button"
            onClick={onSubmit}
            className="sm:absolute sm:right-2 sm:top-1/2 sm:transform sm:-translate-y-1/2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500
           text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
           hover:shadow-lg transition-all text-sm sm:text-base mt-3 sm:mt-0 w-full sm:w-auto"
            disabled={loading || !input}
          >
            Generate
          </button>
        </div>

        {samplePrompts.length > 0 && (
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onInputChange({ target: { value: prompt } })}
                className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-full hover:bg-blue-100 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

TextPromptForm.propTypes = {
  input: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  samplePrompts: PropTypes.arrayOf(PropTypes.string),
};

TextPromptForm.displayName = "TextPromptForm";

export default TextPromptForm;
