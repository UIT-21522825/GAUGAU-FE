import React from 'react';
import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'January',
        pv: 48,

    },
    {
        name: 'February',
        pv: 52,
    },
    {
        name: 'March',
        pv: 60,
    },
    {
        name: 'Apri',
        pv: 34,
    },
    {
        name: 'May',
        pv: 72,
    },
    {
        name: 'June',
        pv: 45,
    },
    {
        name: 'July',
        pv: 82,

    },
    {
        name: 'August',
        pv: 64,
    },
    {
        name: 'September',
        pv: 82,
    },
    {
        name: 'October',
        pv: 75,
    },
    {
        name: 'November',
        pv: 72,
    },
    {
        name: 'December',
        pv: 60,
    },
];


const Orders = () => {
    return (
        <div className='pt-[100px] pb-[100px] px-[25px] bg-[#F8F9FC]'>
            <div className='flex items-center justify-between'>
                <h1 className=' flex cursor-pointer justify-center text-4xl font-bold text-[#2853d2]'>Dự báo</h1>
                <button className='bg-[#2E59D9] h-[32px] rounded-[3px] text-[20px]  text-white flex items-center justify-center px-[30px] cursor-pointer'>Xuất báo cáo</button>
            </div>
            <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
                <div className='h-[100px] rounded-[8px] bg-slate-200 border-l-[4px] border-[#4E73df] flex items-center justify-between px-[30px] px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#2853d2] text-[20px] leading-[17px] font-bold'>Số hóa đơn hôm nay</h2>
                        <h1 className='text-[24px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>10</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className='h-[100px] rounded-[8px] bg-slate-200 border-l-[4px] border-[#4E73df] flex items-center justify-between px-[30px] px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#2853d2] text-[20px] leading-[17px] font-bold'>Số hóa đơn tháng</h2>
                        <h1 className='text-[24px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>200</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className='h-[100px] rounded-[8px] bg-slate-200 border-l-[4px] border-[#4E73df] flex items-center justify-between px-[30px] px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#2853d2] text-[20px] leading-[17px] font-bold'>Số hóa đơn năm</h2>
                        <h1 className='text-[24px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>1000</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className='h-[100px] rounded-[8px] bg-slate-200 border-l-[4px] border-[#4E73df] flex items-center justify-between px-[30px] px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#2853d2] text-[20px] leading-[17px] font-bold'>Tổng doanh thu</h2>
                        <h1 className='text-[24px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>5.000.000 VND</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
            </div>

            < div className='flex justify-center mt-[40px] w-full gap-[30px]' >

                <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] MB-[20px]'>
                        <h2 className='text-[24px] font-bold text-[#2853d2]'>
                            Biểu đồ hóa đơn
                        </h2>
                        <FaEllipsisV color='gray' className='cursor-pointer' />
                    </div>
                    <div>
                        < LineChart
                            width={1400}
                            height={500}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart >
                    </div>
                </div>
            </div >
        </div >
    );
}
export default Orders;
