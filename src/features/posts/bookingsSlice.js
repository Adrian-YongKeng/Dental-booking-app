import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "https://booking-system-api-yy1123.sigma-school-full-stack.repl.co";
//get
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings', 
    async(userid) => { //userId
        const response = await axios.get(`${BASE_URL}/bookings/${userid}`);
        return response.data ;
    }
);
//addbooking
export const addBooking = createAsyncThunk(
    "bookings/addBooking",
    async({name, email, phoneNumber, services, comment, bookingDate, bookingTime, uid}) => {//userId
        const bookingData = {
            name,
            email,
            phonenumber :phoneNumber,
            services,
            bookingdate: bookingDate,
            bookingtime: bookingTime,
            comment,
            userid: uid
        }
        const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
        return  response.data ;
    }
);
//updatebooking
export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async ({ bookingId, ...bookingData }) => {
        const response = await axios.put(`${BASE_URL}/bookings/${bookingId}`, bookingData);
        return response.data;
    }
);

// Delete booking
export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (bookingId) => {
        await axios.delete(`${BASE_URL}/bookings/${bookingId}`);
        return bookingId;
    }
);

//slice
const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [],
        loading: false,
  },
  reducers: {
    resetBookings(state) {
        state.bookings = [];
      },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchBookings.fulfilled, (state,action) => {
            state.bookings = action.payload;
            state.loading = false;
        })
        .addCase(addBooking.fulfilled, (state, action) => {
            state.bookings = [action.payload, ...state.bookings];
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        })
    }
})
// Export the resetBookings action creator
export const { resetBookings } = bookingsSlice.actions;

export default bookingsSlice.reducer;