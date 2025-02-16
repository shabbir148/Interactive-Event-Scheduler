// DayCell.jsx
import React from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components for DayCell

// Container for each individual day cell in the calendar
const DayCellContainer = styled(motion.div)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => (props.isCurrentMonth ? "#fff" : "#c1c1c1")};
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 50px; // Ensure minimum width for responsiveness
  max-width: 100px;
  word-wrap: break-word;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 6px; // Reduce padding on smaller screens
    min-width: 40px;
    max-width: 80px;
  }
`;

const DayNumber = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const EventMarker = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 1px 3px;
  }
`;

// DayCell component represents each day in the calendar grid
const DayCell = ({
  day,
  isCurrentMonth,
  events = [],
  onDayClick,
  onEventClick,
}) => (
  <DayCellContainer
    initial={{ opacity: 0 }} // Animation: Start with opacity 0
    animate={{ opacity: 1 }} // Fade in when component is mounted
    exit={{ opacity: 0 }} // Fade out when component is removed
    isCurrentMonth={isCurrentMonth}
    onClick={isCurrentMonth ? onDayClick : undefined} // Only allow clicks on current month days
  >
    {/* Display day number */}
    <DayNumber>{format(day, "d")}</DayNumber>

    {/* Render events inside the day cell */}
    {events.map((event) => {
      const trimmedTitle =
        event.title.length > 6 ? `${event.title.slice(0, 3)}...` : event.title;

      return (
        <EventMarker
          key={event.id}
          title={event.title} // Native HTML tooltip
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onDayClick when clicking an event
            onEventClick(event);
          }}
        >
          <div data-tooltip={event.title}>{trimmedTitle}</div>
        </EventMarker>
      );
    })}
  </DayCellContainer>
);

export default DayCell;
