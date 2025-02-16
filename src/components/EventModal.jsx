import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addEvent, editEvent, deleteEvent } from "../features/eventSlice";
import { closeModal } from "../features/calendarSlice";

// Styled Components

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-end; // Align to bottom on mobile
  }
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 12px 12px 0 0;
    padding: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:first-child {
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #45a049;
    }
  }

  &:last-child {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #e53935;
    }
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ff4444;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cc0000;
  }
`;

// Framer Motion Variants
const modalVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const EventModal = () => {
  const dispatch = useDispatch();
  const { isOpen, mode, selectedDate, selectedEvent } = useSelector(
    (state) => state.calendar.modal
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (mode === "edit" && selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [mode, selectedEvent, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const eventData = {
      date: selectedDate,
      title: title.trim(),
      description: description.trim(),
    };

    if (mode === "add") {
      dispatch(addEvent(eventData));
    } else {
      dispatch(editEvent({ ...selectedEvent, ...eventData }));
    }
    dispatch(closeModal());
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
      dispatch(closeModal());
    }
  };

  return (
    isOpen && (
      <ModalBackdrop
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        onClick={() => dispatch(closeModal())}
      >
        <ModalContent
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <h3>{mode === "add" ? "Add Event" : "Edit Event"}</h3>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextArea
              placeholder="Event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <ButtonGroup>
              <Button type="submit">
                {mode === "add" ? "Add Event" : "Save Changes"}
              </Button>
              <Button type="button" onClick={() => dispatch(closeModal())}>
                Cancel
              </Button>
            </ButtonGroup>
            {mode === "edit" && (
              <DeleteButton type="button" onClick={handleDelete}>
                Delete Event
              </DeleteButton>
            )}
          </Form>
        </ModalContent>
      </ModalBackdrop>
    )
  );
};

export default EventModal;
