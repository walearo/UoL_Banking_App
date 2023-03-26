import React from "react"

function Container({ children }) {

  return (
    <>
      <header>
        <nav className='bg-white flex justify-between items-center px-[3rem] py-[1rem] drop-shadow-md'>
          <div className='w-[5rem]'></div>
          <div className='flex gap-x-8'>
            <div className='flex items-center'>
              <p className='text-[#028090] mx-[1rem]'>
                <a href='/dashboard'>Dashboard </a>
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-[#028090] mx-[1rem]'>
                <a href='/customers'>Customers</a>
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-[#028090] mx-[1rem]'>
                <a href='/deposit'>Deposit</a>
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-[#028090] mx-[1rem]'>
                <a href='/transfer'>Transfer</a>
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-[#028090] mx-[1rem]'>
                <a href='/withdraw'>Withdraw</a>
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <p className='text-[#028090] mx-[1rem]'>
              <a href='/logout' className='mx-[0.5rem]'>Logout</a>
            </p>
          </div>
        </nav>
      </header>

      {children}

      <footer className=' bg-[#f5f5f5] flex justify-between items-center px-[3rem] py-[1rem]'>
        
      </footer>
    </>
  )
}
export default Container
