// store.js
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendarSlice";
import eventReducer from "../features/eventSlice";

// Configure Redux store with combined reducers
export default configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventReducer,
  },
});
