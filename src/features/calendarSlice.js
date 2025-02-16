// calendarSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the calendar
const initialState = {
  currentMonth: new Date().toISOString(), // Store the current month as an ISO string
  modal: {
    isOpen: false, // Tracks whether the event modal is open or closed
    mode: "add", // Determines if the modal is in 'add' or 'edit' mode
    selectedDate: null, // Stores the date for which an event is being added/edited
    selectedEvent: null, // Stores the event details when editing
  },
};

// Create a Redux slice for calendar-related state management
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Update the current month in the state
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },

    // Open the modal for adding a new event
    openAddModal: (state, action) => {
      state.modal = {
        isOpen: true, // Open the modal
        mode: "add", // Set mode to 'add'
        selectedDate: action.payload, // Store the selected date
        selectedEvent: null, // No event data needed for a new event
      };
    },

    // Open the modal for editing an existing event
    openEditModal: (state, action) => {
      state.modal = {
        isOpen: true, // Open the modal
        mode: "edit", // Set mode to 'edit'
        selectedDate: action.payload.date, // Store the event's date
        selectedEvent: action.payload, // Store the full event data
      };
    },

    // Close the event modal and reset modal state
    closeModal: (state) => {
      state.modal = initialState.modal; // Reset modal to its initial state
    },
  },
});

// Export action creators for use in components
export const { setCurrentMonth, openAddModal, openEditModal, closeModal } =
  calendarSlice.actions;

// Export the reducer to be used in the store
export default calendarSlice.reducer;
