import React from 'react';

function Error() {
  return (
    <div className='flex justify-center align-item items-center min-h-screen'>
        <img src={"/images/Error.png"} alt="logo-app" className='w-[220px] h-[220px]'/>
        <div className='text-[#343434] text-4xl font-bold'>Rất tiếc, bạn chưa được phân quyền!</div>
    </div>
  );
}

export default Error;
