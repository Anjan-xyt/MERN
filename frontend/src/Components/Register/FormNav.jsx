import PropTypes from 'prop-types';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import Button from '../react-components/Button';

function FormNav(props) {
  const { activeStep, steps, setActiveStep } = props;
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
    <div className="flex w-full justify-between pt-2 md:pt-4 lg:pt-6">
      <Button onClick={prev} isDisabled={activeStep === 0} textsize = 'lg:text-4xl md:text-2xl text-xl' content={<MdOutlineKeyboardArrowLeft />} />
      <Button isDisabled={activeStep !== steps.length - 1} content="Register" />
      <Button onClick={next} isDisabled={activeStep === steps.length - 1} textsize = 'lg:text-4xl md:text-2xl text-xl' content={<MdOutlineKeyboardArrowRight />} />
    </div>
  );
}

FormNav.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default FormNav;
