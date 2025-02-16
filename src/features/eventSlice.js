// eventSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid"; // Import UUID for generating unique event IDs

// Create a Redux slice for managing calendar events
export const eventSlice = createSlice({
  name: "events", // Name of the slice
  initialState: [], // Events are stored as an array
  reducers: {
    // Add a new event with a unique ID
    addEvent: (state, action) => {
      state.push({ id: uuid(), ...action.payload }); // Assign a unique ID and add event to state
    },

    // Edit an existing event by finding it in the state and updating its data
    editEvent: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id); // Find the event by ID
      if (index !== -1) state[index] = action.payload; // Update the event if found
    },

    // Delete an event by filtering out the one with the matching ID
    deleteEvent: (state, action) => {
      return state.filter((e) => e.id !== action.payload); // Remove the event with the given ID
    },
  },
});

// Export action creators for use in components
export const { addEvent, editEvent, deleteEvent } = eventSlice.actions;

// Export the reducer to be used in the store
export default eventSlice.reducer;
