import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <div className=' home-container flex  overflow-hidden bg-white rounded-lg'>
      <Header />
      <div className='flex flex-col flex-1 w-0 overflow-hidden'>
        <main className='relative flex-1 overflow-y-auto focus:outline-none'>
          <div className='py-6 '>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
              <h1 className='text-lg text-neutral-600'></h1>
              <div className='relative px-4 py-12 sm:px-6 lg:py-16 lg:px-8'>
                <div className='relative mx-auto max-w-7xl'>
                  <Outlet />
                </div>
              </div>
            </div>
            {/* <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
              <div className='py-4'>
                <div className='rounded-lg bg-gray-50 h-96' />
              </div> */}
            {/* Do not cross the closing tag underneath this coment*/}
            {/* </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
