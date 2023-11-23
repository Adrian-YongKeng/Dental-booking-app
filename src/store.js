import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/posts/bookingsSlice";

export default configureStore({
    reducer: {
        bookings: bookingsReducer,
    },
})