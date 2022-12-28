import React, { useState, useEffect, useContext } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import.meta.env.DEV;

export default function ItemForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: React.FormEvent) => {
    // @ts-ignore
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  Geocode.setApiKey(import.meta.env.VITE_GOOGLE_API_KEY);
  return (
    <div className='relative flex items-center justify-center h-95v py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover relative items-center'>
      <div className='absolute inset-0 z-0' />
      <div className='sm:max-w-3xl w-full p-10 bg-login-card rounded-xl z-10'>
        <div className='text-center'>
          <h2 className='mt-5 text-4xl font-bold text-white'>Create Listing</h2>
          <p className='mt-2 text-sm text-gray-400'>
            Enter details about the item you want to sell.
          </p>
        </div>
        <form className='mt-8 space-y-3' action='#' method='POST'>
          <div className='grid grid-cols-1 space-y-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              What do you want to sell?
            </label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              type=''
              placeholder='A lawnmower'
            />
          </div>
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Details about your item?
            </label>
            <input
              type='text'
              id='large-input'
              className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className='relative z-0 mb-6 w-full group'>
              <label
                htmlFor='location'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Where is your item at?
              </label>
              <Autocomplete
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                style={{ width: '300px' }}
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                onPlaceSelected={(place) => {
                  Geocode.fromAddress(place.formatted_address).then(
                    (response: any) => {
                      const { lat, lng } =
                        response.results[0].geometry.location;
                      console.log(lat, lng);
                    },
                    (error: any) => {
                      console.error(error);
                    }
                  );
                  console.log(place.formatted_address);
                }}
              />
            </div>
            <div className='relative z-0 mb-6 w-full group'>
              <label
                htmlFor='price'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Price
              </label>
              <input
                type='tel'
                id='phone'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='AUD 9999'
                pattern='[0-9]'
                required
              />
            </div>
          </div>
          <div className='grid grid-cols-1 space-y-2'>
            <label className='text-sm font-bold text-gray-500 tracking-wide'>
              Attach Image
            </label>
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  {isFilePicked ? (
                    <div>
                      <div className='flex items-center justify-center'>
                        <svg
                          className='w-10 h-10 mb-3 text-gray-400'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z'
                            fill='currentColor'
                          />
                        </svg>
                      </div>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold flex items-center justify-center'>
                          {selectedFile.name}
                        </span>{' '}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        {selectedFile.type}{' '}
                        {Math.round(selectedFile.size / (1024).toFixed(3))} KB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className='flex items-center justify-center'>
                        <svg
                          aria-hidden='true'
                          className='w-10 h-10 mb-3 text-gray-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                          ></path>
                        </svg>
                      </div>
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  id='dropzone-file'
                  type='file'
                  className='hidden'
                  onChange={changeHandler}
                />
              </label>
            </div>
          </div>
          <p className='text-sm text-gray-300'>
            <span>File type: doc,pdf,types of images</span>
          </p>
          <fieldset>
            <legend className='sr-only'>Checkbox variants</legend>

            <div className='flex items-center mb-4'>
              <input
                checked
                id='checkbox-1'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checkbox-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                I agree to the{' '}
                <a
                  href='#'
                  className='text-blue-600 hover:underline dark:text-blue-500'
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>

            <div className='flex mb-4'>
              <div className='flex items-center h-5'>
                <input
                  id='helper-checkbox'
                  aria-describedby='helper-checkbox-text'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
              </div>
              <div className='ml-2 text-sm'>
                <label
                  htmlFor='helper-checkbox'
                  className='font-medium text-gray-900 dark:text-gray-300'
                >
                  Free shipping via SoldBy
                </label>
                <p
                  id='helper-checkbox-text'
                  className='text-xs font-normal text-gray-500 dark:text-gray-400'
                >
                  For orders shipped from $25 in books or $29 in other
                  categories
                </p>
              </div>
            </div>
          </fieldset>
          <div>
            <button
              type='submit'
              className='my-5 w-full flex justify-center bg-indigo-700  text-gray-100 p-4  rounded-full tracking-wide
                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300'
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
