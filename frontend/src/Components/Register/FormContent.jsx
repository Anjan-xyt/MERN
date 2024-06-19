import PropTypes from 'prop-types';
import InputPass from '../react-components/InputPass';
import Input from '../react-components/Input';
import Textarea from '../react-components/Textarea';
import Radio from '../react-components/Radio';

function FormContent({ activeStep }) {
  return (
    <div className="mt-2 flex min-w-full items-center justify-center rounded border border-neutral-300 bg-neutral-200 dark:border-neutral-500 dark:bg-zinc-900 md:p-8">
      {activeStep === 0 && (
        <div className="grid w-full grid-cols-1 place-items-center justify-center gap-6 p-6 md:gap-8 md:py-8 md:pt-7">
          <div className="w-full md:w-3/4">
            <Input label="Enter your full name" type="text" name="full_Name" />
          </div>
          <div className="w-full md:w-3/4">
            <Radio />
          </div>

          <div className="w-full md:w-3/4">
            <InputPass label="Enter a password" name="password" />
          </div>
          <div className="w-full md:w-3/4">
            <InputPass label="Confirm password" name="confirmPassword" />
          </div>
          <div className="w-full md:w-3/4">
            <input type="date" className="w-full outline-none " />
          </div>

          <div className="w-full md:w-3/4">
            <Textarea label="Add bio" name="bio" rows={5} cols={50} />
          </div>
        </div>
      )}
    </div>
  );
}

FormContent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};

export default FormContent;
