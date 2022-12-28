import React from 'react';
import { ItemProps } from '../../contexts/ItemContext';

export default function Feed({ item }: any) {
  return (
    <>
      {/* <form>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='search'
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search'
            required
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form> */}
      <div className='flex flex-col overflow-hidden rounded-lg shadow-lg'>
        <div className='flex-shrink-0'>
          <img
            className='object-cover w-full h-48'
            src='https://images.unsplash.com/photo-1561654791-00316c79efa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60'
            alt=''
          />
        </div>
        <div className='flex flex-col justify-between flex-1 p-6 bg-white'>
          <div className='flex-1'>
            <a href='#' className='block mt-2'>
              <p className='text-xl font-semibold text-neutral-600'>
                {item.itemTitle}
              </p>
              <p className='mt-3 text-base text-gray-500'>{item.itemDesc}</p>
            </a>
          </div>
          <div className='flex items-center mt-6'>
            <div className='flex-shrink-0'>
              <a href='https://twitter.com/Mike_Andreuzza'>
                <span className='sr-only'> {item.userId}</span>
                <img
                  className='w-10 h-10 rounded-full'
                  src='https://images.unsplash.com/photo-1561654791-00316c79efa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60'
                  alt=''
                />
              </a>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-neutral-600'>
                <a
                  href='https://twitter.com/Mike_Andreuzza'
                  className='hover:underline'
                >
                  {' '}
                  {item.userId}
                </a>
              </p>
              <div className='flex space-x-1 text-sm text-gray-500'>
                <time dateTime='2020-03-16'> {item.itemLocation} </time>
                <span aria-hidden='true'> · </span>
                <span> 6 min read </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
