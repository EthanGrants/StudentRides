import { format, getDay, parse, startOfWeek } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "meeting",
        // Date(YYYY, MM, DD)
        // where month is indexed from 0 (Jan) - 11 (Dec)
        start: moment("2024-01-18T10:00:00").toDate(),
        end: moment("2024-01-18T11:00:00").toDate(),
    }
]

export default function RidesCalendar() {
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        // spreads current events and then push new event
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <>
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input 
                    type="text"
                    placeholder="Add Title"
                    style={{width:"20%", marginRight:"10px"}}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DatePicker
                    placeholderText="Start Date"
                    style={{marginRight: "10px"}}
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DatePicker
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({...newEvent, end})}
                />
                <button 
                    style={{marginTop: "10px"}}
                    onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar 
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{height:500, margin:"50px"}} 
            />
        </>
    )
}
