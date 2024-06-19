import PropTypes from 'prop-types';

export default function Button({
  isDisabled = false,
  content = 'button',
  onClick,
  textsize = 'md:text-lg text-[10px]',
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`rounded-md border bg-blue-500 px-4 py-2 text-white disabled:border-neutral-400 disabled:bg-neutral-200 disabled:text-gray-500 dark:bg-violet-950 dark:disabled:border-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-gray-500 md:bg-purple-700 md:text-3xl md:dark:bg-neutral-950 ${textsize}`}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  isDisabled: PropTypes.bool,
  content: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  textsize: PropTypes.string,
};
