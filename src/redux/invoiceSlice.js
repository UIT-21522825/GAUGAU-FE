import { createSlice } from "@reduxjs/toolkit";
import data from '../assets/data'
const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        allInvoice: data,
    },

    reducers: {

    }
})


export default invoiceSlice