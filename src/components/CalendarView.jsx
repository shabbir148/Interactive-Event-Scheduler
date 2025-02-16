// CalendarView.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import styled from "styled-components";
import DayCell from "./DayCell";
import {
  setCurrentMonth,
  openAddModal,
  openEditModal,
} from "../features/calendarSlice";

// Styled Components for CalendarView

// Container for the calendar layout
const CalendarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: auto; /* Allows horizontal scrolling if needed */
`;

// Header section containing the month navigation buttons and title
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 10px;
    h2 {
      font-size: 1.2rem;
    }
  }
`;

// Grid layout for the calendar with 7 columns (one for each day of the week)
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(
      7,
      minmax(30px, 1fr)
    ); /* Ensures responsiveness */
    font-size: 12px;
  }
`;

// Styled button for navigating between months
const Button = styled.div`
  background-color: #add8e6;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  width: 40px;
  text-align: center;

  @media (max-width: 600px) {
    width: 35px;
    padding: 8px;
  }
`;

// Header for weekday labels (Sunday to Saturday)
const WeekdayHeader = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: bold;
  background-color: #add8e6;
  border-radius: 4px;

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const CalendarView = () => {
  const dispatch = useDispatch();

  // Get the current month from Redux state and parse it into a Date object
  const currentMonth = parseISO(
    useSelector((state) => state.calendar.currentMonth)
  );

  // Retrieve events from Redux state
  const events = useSelector((state) => state.events);

  // Generate the calendar grid, ensuring it starts from the first day of the week
  // and ends at the last day of the week covering the entire month
  const daysGrid = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  // Function to move to the previous month and update state
  const handlePrevMonth = () =>
    dispatch(setCurrentMonth(format(subMonths(currentMonth, 1), "yyyy-MM-dd")));

  // Function to move to the next month and update state
  const handleNextMonth = () =>
    dispatch(setCurrentMonth(format(addMonths(currentMonth, 1), "yyyy-MM-dd")));

  return (
    <CalendarContainer>
      {/* Calendar Header with navigation buttons */}
      <Header>
        <Button onClick={handlePrevMonth}>&lt;</Button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </Header>

      {/* Calendar Grid with weekday labels and days */}
      <CalendarGrid>
        {/* Render the headers for each weekday */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <WeekdayHeader key={day}>{day}</WeekdayHeader>
        ))}

        {/* AnimatePresence handles animation when days change */}
        <AnimatePresence initial={false}>
          {daysGrid.map((day) => (
            <DayCell
              key={format(day, "yyyy-MM-dd")}
              day={day}
              isCurrentMonth={isSameMonth(day, currentMonth)} // Highlight days that belong to the current month
              events={events.filter(
                (e) => e.date === format(day, "yyyy-MM-dd")
              )} // Filter and pass events for the specific day
              onDayClick={() =>
                dispatch(openAddModal(format(day, "yyyy-MM-dd")))
              } // Open the add event modal on day click
              onEventClick={(event) => dispatch(openEditModal(event))} // Open the edit modal when an event is clicked
            />
          ))}
        </AnimatePresence>
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default CalendarView;
