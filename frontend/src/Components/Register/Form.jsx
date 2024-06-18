import { useState } from 'react';
import Stepper from './Stepper';
import FormNav from './FormNav';
import FormContent from './FormContent';

function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Personal Details', 'Account Varification', 'Upload Avatar'];
  return (
    <div className="min-h-3/4 flex w-3/4 flex-col items-center">
      <Stepper activeStep={activeStep} steps={steps} />
      <FormContent activeStep={activeStep} />
      <FormNav activeStep={activeStep} steps={steps} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Form;
