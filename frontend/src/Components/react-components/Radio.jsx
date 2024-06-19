import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { toast } from 'react-hot-toast';

function Radio() {
  const [gender, setGender] = useState('Male');

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    toast.success(`Gender updated to ${e.target.value}`);
  };
  const options = ['Male', 'Female', 'Others'];
  return (
    <>
      <span className="text-gray-400 dark:text-neutral-500 mb-2 block cursor-default text-[15px] md:text-lg">
        Select your gender :
      </span>
      <div className="flex w-full justify-between gap-2 md:gap-3 lg:gap-5">
        {options.map((option, index) => (
          <div
            className={`relative h-10 w-full flex-grow rounded-bl-xl rounded-tr-lg border border-b-4 bg-inherit md:h-16 lg:h-20 border-neutral-400 dark:border-neutral-600 ${gender === option ? 'border-blue-500 bg-blue-200 dark:border-neutral-200 dark:bg-neutral-950 md:border-purple-800 md:bg-purple-300' : ''}`}
            key={index}
          >
            <input
              type="radio"
              id={`option${index}`}
              name="gender"
              value={option}
              onChange={handleGenderChange}
              className="absolute h-full w-full cursor-pointer appearance-none"
            />
            <label
              htmlFor={`option${index}`}
              className="flex h-full items-center justify-center text-wrap text-gray-400 px-2 dark:text-neutral-500"
            >
              {gender === option ? (
                <TiTick className="text-2xl text-blue-500 md:text-purple-800 dark:text-neutral-300 md:text-4xl  lg:text-5xl" />
              ) : (
                option
              )}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default Radio;
