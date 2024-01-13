import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, query, getDocs, addDoc } from "@firebase/firestore";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function AddEvent({allEvents, setAllEvents}) {
    // ~fetching Firestore data~
    useEffect(() => {
        async function fetchEvents() {
            try {
                const q = query(collection(firestore, "events"));
                const querySnapshot = await getDocs(q);
                const currentEvents = querySnapshot.docs.map(doc => doc.data());
                for (let i = 0; i < currentEvents.length; i++) {
                    currentEvents[i].start = new Date(currentEvents[i].start.seconds*1000);
                    currentEvents[i].end = new Date(currentEvents[i].end.seconds*1000);
                }
                setAllEvents(currentEvents);
            } catch (err) {
                console.log(err);
            } 
        }
        fetchEvents();
    }, [setAllEvents]);

    // ~add events functionality~
    const event = {
        title: "",
        startLocation: "",      // default is UCSB
        endLocation: "",        // ride destination
        start: new Date(),      // departure date and time
        end: new Date(),
        seats: 0,               // num seats available in the car
        cost: 0,                // cost of ride
        contact: "",            // phone number
    }
    
    // newEvents initialized to a "default" data entry
    const [newEvent, setNewEvent] = useState(event);
    // for DateTimePicker
    const[value, setValue] = useState(new Date());
    const ref = collection(firestore, "events")

    // add document to collection
    const handleAddEvent = (e) => {
        e.preventDefault();
        newEvent.end.setHours(newEvent.start.getHours()+1);
        newEvent.title = newEvent.startLocation + " to " + newEvent.endLocation;
        // spreads current events and pushes new event to allEvents
        setAllEvents([...allEvents, newEvent]);
        
        try {
            // add new event to collection
            addDoc(ref, newEvent);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>Add New Event</h2>
            <div>
                <input 
                    type="text"
                    placeholder="Start Location"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.startLocation}
                    onChange={(e) => setNewEvent({...newEvent, startLocation: e.target.value})}
                />
                <input 
                    type="text"
                    placeholder="End Location"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.endLocation}
                    onChange={(e) => setNewEvent({...newEvent, endLocation: e.target.value})}
                />
                <DateTimePicker
                    placeholderText="Departure"
                    style={{marginRight: "10px"}}
                    selected={newEvent.start}
                    value={value}
                    onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <input 
                    type="num"
                    placeholder="Seats"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.seats}
                    onChange={(e) => setNewEvent({...newEvent, seats: e.target.value})}
                />
                <input 
                    type="num"
                    placeholder="Cost"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.cost}
                    onChange={(e) => setNewEvent({...newEvent, cost: e.target.value})}
                />
                <input 
                    type="tel"
                    placeholder="Contact"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.contact}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={(e) => setNewEvent({...newEvent, contact: e.target.value})}
                />
                <button 
                    style={{marginTop: "10px"}}
                    onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
        </div>
    )
}