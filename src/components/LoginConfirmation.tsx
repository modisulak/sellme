import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import AlertError from './AlertError';
// import { LockClosedIcon } from '@heroicons/react/20/solid';

function LoginConfirmation() {
  const [code, setCode] = useState('');
  const { user, confirmSignUp, error } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await confirmSignUp(user.username, code);
    console.log(response);
    response ? navigate('/login') : '';
  };
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      {error ? <AlertError error={error} /> : null}
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Flowbite
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Confirm Registration
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleOnSubmit}>
              <div>
                <label
                  htmlFor='code'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Verification Code
                </label>
                <input
                  type='text'
                  name='code'
                  id='code'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  value={code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCode(e.target.value)
                  }
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Confirm Registration
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Resend Confirmation?{' '}
                <a
                  href='/'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Resend Code
                </a>
                <br></br>
                Already have an account?{' '}
                <a
                  href='/'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginConfirmation;
