import React from "react"
import Menubar from "../../shared-components/Menubar/Menubar"

function HomePage() {
  return (
    <>
      <main className='font-Mulish'>
        <Menubar />
        <div className='flex justify-center h-screen'>
          <div className=' flex flex-col mt-[5rem] w-[70rem]'>
            <div className='flex  justify-between  items-center'>
              <div className='mx-[5rem]'>
                <h1 className='w-[30rem] text-[#028090] text-[2.5rem] font-[Mulish] '>
                  Online Banking System
                </h1>
                <h1 className='mt-[1.5rem] text-[1.2rem] w-[25rem] '>
                  This is a simple banking software system that provides minimum features below:
                </h1>
                <ol className='mt-[1rem] text-[1.2rem]' type="1">
                  <li>* Create an account</li>
                  <li>* Withdraw cash</li>
                  <li>* Deposit cash</li>
                  <li>* Transfer between accounts</li>
                  <li>* View account detail</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
