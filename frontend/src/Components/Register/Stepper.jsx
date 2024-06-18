import PropTypes from 'prop-types';

function Stepper(props) {
  const { activeStep, steps } = props;
  return (
    <div className={`flex w-full gap-1`}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`animate-color-flow flex h-20 flex-grow flex-col items-center justify-center rounded-lg border transition-colors duration-1000 md:h-28 md:text-lg ${index === activeStep && 'border-blue-500 bg-blue-100 text-blue-600 dark:border-white dark:bg-zinc-900 dark:text-gray-400 md:border-purple-800 md:bg-purple-200 md:text-purple-800'} ${index < activeStep && 'border-blue-300 bg-blue-100 text-blue-600 dark:border-zinc-900 dark:bg-zinc-900 dark:text-gray-400 md:border-purple-300 md:bg-purple-200 md:text-purple-800'} ${index > activeStep && 'border-neutral-300 bg-neutral-200 dark:border-stone-900 dark:bg-stone-900 dark:text-neutral-700'} `}
        >
          <div
            className={`flex size-6 items-center justify-center rounded-full md:size-8 ${index <= activeStep ? 'bg-blue-500 text-white dark:bg-neutral-700 md:bg-purple-700' : 'bg-neutral-600 text-gray-400 dark:bg-neutral-800'}`}
          >
            {index + 1}
          </div>
          <div className="w-full text-wrap text-center tracking-widest md:tracking-tighter">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Stepper;
