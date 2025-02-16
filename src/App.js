// App.jsx
import React from "react";
import { Provider } from "react-redux";
import store from "../src/store/store";
import GlobalStyles from "../src/styles/GlobalStyles";
import CalendarView from "../src/components/CalendarView";
import EventModal from "../src/components/EventModal";

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <CalendarView />
    <EventModal />
  </Provider>
);

export default App;
