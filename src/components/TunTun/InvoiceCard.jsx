import React from 'react'
import {AiOutlineCheck, AiOutlineRight} from 'react-icons/ai'
import PaidSta from './PaidSta'

function InvoiceCard({invoice}) {
  return (
      <div>
          <div className='hidden md:flex cursor-pointer duration-100  ease-in-out  hover:border border-blue-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white/[0.6] rounded-lg  items-center justify-between'>
              <div className='flex items-center'>
                  <h2 className='dark:text-white'>
                      <span className='text-black '>
                          #
                      </span>
                      {invoice.id}
                  </h2>

                  <h2 className='text-sm text-gray-500 font-light ml-6'>
                      Due{invoice.paymentDue}
                  </h2>

                  <h2 className='text-sm text-gray-500 font-light ml-10'>
                      {invoice.clientName}
                  </h2>
              </div>
              <div className='flex items-center'>
                  <h1 className='text-xl mr-8 dark:text-white '>
                      {invoice.total} VND
                  </h1>
                  <PaidSta type={invoice.status} />
                  <AiOutlineRight className='ml-4 text-sm  dark:text-white text-[#2e59d9] dark:hover:text-[#2e59d9]'/>
              </div>
          </div>
          {/* Repponsive - mobile */}
          <div className='md:hidden flex cursor-pointer hover:border-blue-500 border-transparent py-4 shadow-sm px-6 dark:bg-[#1e2139] bg-white rounded-lg items-center justify-between'>
              <div className='flex flex-col'> 
                  <h2 className='dark:-text-white'>
                      <span className='text-[#7e88c3]'>
                          #
                      </span>
                      {invoice.id}
                  </h2>
                  <h2 className='text-sm text-gray-500 font-light mt-3'>
                      Due{invoice.paymentDue}
                  </h2>

                  <h1 className='text-xl dark:text-white'>
                      {invoice.total} VND
                  </h1>
              </div>
              <div className='flex flex-col'>
                  <h2 className='text-sm mb-4 text-gray-500 font-light text-right'>
                      {invoice.clientName}
                  </h2>
                  <PaidSta type={invoice.status}/>
              </div>
          </div>
    </div>
  )
}

export default InvoiceCard