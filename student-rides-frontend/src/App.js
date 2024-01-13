import './App.css';
import AddEvent from "./components/addEvent"
import RidesCalendar from './components/calendar';
import { useState } from "react";

function App() {
  // allEvents initialized to the current data in Firestore
  const [allEvents, setAllEvents] = useState();

  return (
    <div className="App">
      <AddEvent allEvents={allEvents} setAllEvents={setAllEvents}/>
      <RidesCalendar allEvents={allEvents} setAllEvents={setAllEvents}/>
    </div>
  );
}

export default App;
