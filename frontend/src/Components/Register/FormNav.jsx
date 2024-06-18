import PropTypes from 'prop-types';

function FormNav(props) {
  const {activeStep, steps, setActiveStep} = props;
  const next = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const prev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <div className='flex justify-between w-full'>
      <button onClick={prev} disabled={activeStep === 0}>Prev</button>
      {activeStep === steps.length ? <button>Register</button> : <button>Register</button>}
      <button onClick={next} disabled={activeStep === steps.length - 1}>Next</button>
    </div>
  );
}

FormNav.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default FormNav;
