// src/redux/someReducer.js
const initialState = {
  data: [],
  loading: false,
  error: null,
  filteredInvoice: null, // Thêm trạng thái filteredInvoice vào initialState
};

const someReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_FILTERED_INVOICE': // Thêm action SET_FILTERED_INVOICE để cập nhật filteredInvoice
      return {
        ...state,
        filteredInvoice: action.payload,
      };

    default:
      return state;
  }
};

export default someReducer;
