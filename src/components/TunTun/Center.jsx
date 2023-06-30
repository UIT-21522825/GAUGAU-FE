import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { AiOutlineDownSquare, AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import InvoiceCard from './InvoiceCard';
import CreateInvoice from './CreateInvoice'
import { useLocation } from 'react-router-dom'

function Center() {
    const location = useLocation()
    const controls = useAnimation();
    const dispatch = useDispatch()
    const [isDropDown, setIsDropDown] = useState(false);
    const [filterValue, setFilterValue] = useState('');
     const [openCreateInvoice, setOpenCreateInvoice] = useState(false)

    const transition = {
        stiffness: 200,
    };

    const invoices = useSelector((state) => state.invoices.allInvoice)
    console.log(invoices)

    const varients = {
        open: { opacity: 1, x: -20, duration: 200, transition },
        close: { opacity: 0, x: -100, duration: 500, transition }
    }

    const filter = ['paid', 'pending', 'draft']


  return (
      <div>
            <div className='dark:bg-[#141625] duration-300 min-h-screen bg-white/[0.6] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]'>
              <motion.div
                  key={location.pathname}
                  initial={{ x: '0' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-150%' }}
                  transition={{ duration: 0.5 }}
                  className='max-w-3xl flex flex-col mx-auto my-auto'>
                    <motion.div className='min-w-full max-h-[64px] flex items-center justify-between'>
                        <div>
                            <h1 className='lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold'>Invoices</h1>
                            <p className=' text-gray-500 font-light'>There are (invoice length) total invoices.</p>
                        </div>

                        <div className=' flex max-h-full items-center'>
                            <div className="flex items-center">
                              <div className="flex align-center">
                                  
                                <p className="hidden md:block dark:text-white font-medium">Filter by status</p>
                                <p className="md:hidden dark:text-white font-medium">Filter</p>
                                <div
                                    className="cursor-pointer ml-3 dark:text-white"
                                    onClick={() => setIsDropDown((state) => !state)}
                                >
                                    <motion.div
                                    animate={isDropDown ? { transition, rotate: -180 } : { transition, rotate: 0 }}
                                    >
                                    <AiOutlineDownSquare />
                                    </motion.div>
                                </div>
                            </div>

                              {
                                  isDropDown &&
                                  <motion.div
                                      variants={varients}
                                      animate={isDropDown ? "open" : "close"}
                                          className='w-40 bg-white dark:bg-[#1E2139] dark:text-white flex px-6 py-4 flex-col  top-[160px] lg:top-[120px]  absolute  shadow-2xl rounded-xl space-y-2'
                                    >
                                          {filter.map((item, index) => {
                                              return (
                                                  <div
                                                      onClick={() => {
                                                          item === filterValue ? setFilterValue('') : setFilterValue(item)
                                                      }}
                                                      key={index}
                                                      className='items-center cursor-pointer flex space-x-2'
                                                  >
                                                      <input
                                                          value={item}
                                                          checked={filterValue === item ? true : false}
                                                          type="checkbox" className='accent-[#7c5dfa] hover:accent-[#7c5dfa]'
                                                      />
                                                      <p>
                                                          {item}
                                                      </p>         
                                                  </div>
                                              )
                                          })}
                                  </motion.div>
                              }
                              <button
                                  className='hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full'
                              >
                                  <AiOutlinePlusCircle />
                                  <p onClick={() => setOpenCreateInvoice(true)} className='md:block hidden text-white'>
                                      New Invoice
                                  </p>
                                  <p className=' md:hidden block text-white font-semibold text-base'>New</p>
                            </button>
                        </div>
                    </div>
                </motion.div> 
                {/* Invoice Cards Section */}
                <div className='space-y-4'>
                    {
                        invoices.map((invoice, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{duration : 0.5}}
                                >
                                    <InvoiceCard invoice={invoice}/> 
                                </motion.div>
                            )
                        })
                    }
                </div>
            </motion.div>
          </div>
           <AnimatePresence>
                {openCreateInvoice &&
                    <CreateInvoice openCreateInvoice={openCreateInvoice} setOpenCreateInvoice={setOpenCreateInvoice} />
                }
            </AnimatePresence>
    </div>
  )
}

export default Center