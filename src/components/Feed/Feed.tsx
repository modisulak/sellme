import React, { useEffect, useState } from 'react';
import { ItemProps } from '../../contexts/ItemContext';
// @ts-ignore
import Geocode from 'react-geocode';
import { getDistance } from 'geolib';
import.meta.env.DEV;

export default function Feed({ item }: any) {
  const [userLocation, setUserLocation] = useState({});
  const [itemLocation, setItemLocation] = useState({});
  const [distance, setDistance] = useState(0);
  Geocode.setApiKey(import.meta.env.VITE_GOOGLE_API_KEY);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // console.log(position.coords);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    Geocode.fromAddress(item.itemLocation).then(
      (response: any) => {
        const { lat, lng } = response.results[0].geometry.location;
        setItemLocation({
          latitude: lat,
          longitude: lng,
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    // @ts-ignore
    const distanceResponse = getDistance(userLocation, itemLocation);
    setDistance(distanceResponse / 1000);
  }, [userLocation, itemLocation, distance]);

  return (
    <>
      <div className='flex flex-col overflow-hidden rounded-lg shadow-lg'>
        <div className='flex-shrink-0'>
          <img
            className='object-cover w-full h-48'
            src={item.itemPicture}
            alt=''
          />
        </div>
        <div className='flex flex-col justify-between flex-1 p-6 bg-white'>
          <div className='flex-1'>
            <a href='#' className='block mt-2'>
              <div className='flex flex-row justify-between'>
                <p className='text-xl font-semibold text-neutral-600'>
                  {item.itemTitle}
                </p>
                <span className='bg-green-100 text-white font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-white-800'>
                  $ {item.itemPrice}
                </span>
              </div>
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
                <span> {distance} KM away </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
