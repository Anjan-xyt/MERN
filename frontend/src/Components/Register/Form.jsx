import { useState } from 'react';
import Stepper from './Stepper';
import FormNav from './FormNav';

function Form() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['Personal Information', 'Account Varification', 'Details Confirmation'];
  return (
    <div className="min-h-3/4 w-3/4 flex flex-col items-center">
      <Stepper activeStep={activeStep} steps={steps} />
      <FormNav activeStep={activeStep} steps={steps} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Form;
