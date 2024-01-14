import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { collection, addDoc } from "@firebase/firestore";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import styles from "./addEvents.module.css";

export default function AddEvent({ allEvents, setAllEvents }) {
  // ~add events functionality~
  const event = {
    title: "",
    startLocation: "", // default is UCSB
    endLocation: "", // ride destination
    start: new Date(), // departure date and time
    end: new Date(),
    seats: 0, // num seats available in the car
    cost: 0, // cost of ride
    contact: "", // phone number
    author_id: "",
  };

  // newEvents initialized to a "default" data entry
  const [newEvent, setNewEvent] = useState(event);
  // for DateTimePicker
  const [dateValue, setDateValue] = useState(new Date());
  const ref = collection(firestore, "events");

  // add document to collection
  const handleAddEvent = (e) => {
    e.preventDefault();
    newEvent.title = newEvent.startLocation + " to " + newEvent.endLocation;
    newEvent.start = dateValue;
    newEvent.end.setTime(newEvent.start.getTime() + 60 * 60 * 1000);
    newEvent.author_id = auth.currentUser.uid;

    // spreads current events and pushes new event to allEvents
    setAllEvents([...allEvents, newEvent]);
    console.log(allEvents);
    try {
      // add new event to collection
      addDoc(ref, newEvent);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <h2 className={styles.header}>StudentRides</h2> */}
      <div style={{}}>
        <input
          type="text"
          placeholder="Start Location"
          style={{ width: "20%", marginRight: "5px",height: "20px",borderRadius: "30px", borderColor: "grey"}}
          value={newEvent.startLocation}
          onChange={(e) =>
            setNewEvent({ ...newEvent, startLocation: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="End Location"
          style={{ width: "20%", marginRight: "10px",height: "20px",borderRadius: "30px", borderColor: "grey"}}
          value={newEvent.endLocation}
          onChange={(e) =>
            setNewEvent({ ...newEvent, endLocation: e.target.value })
          }
        />
        <DateTimePicker
          placeholderText="Departure"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          value={dateValue}
          onChange={setDateValue}
        />
        <input
          type="text"
          placeholder="Seats"
          style={{ width: "20%", marginLeft: "5px",marginRight: "10px",height: "20px",borderRadius: "30px", borderColor: "grey" }}
          value={newEvent.seats === 0 ? "" : newEvent.seats}
          onChange={(e) => {
            const seatsValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            setNewEvent({ ...newEvent, seats: seatsValue || 0 });
          }}
        />
        <input
         type="text"
         placeholder="Cost"
         style={{ width: "20%", marginRight: "10px", height: "20px",borderRadius: "30px", borderColor: "grey"}}
         value={newEvent.cost === 0 ? "" : newEvent.cost}
         onChange={(e) => {
           const costValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
           setNewEvent({ ...newEvent, cost: costValue || 0 });
         }}
        />
        <input
          type="tel"
          placeholder="Contact"
          style={{ width: "20%", marginRight: "10px",height: "20px",borderRadius: "30px", borderColor: "grey" }}
          value={newEvent.contact}
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          onChange={(e) =>
            setNewEvent({ ...newEvent, contact: e.target.value })
          }
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
}
