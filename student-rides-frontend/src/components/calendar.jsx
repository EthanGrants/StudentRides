import { format, getDay, parse, startOfWeek } from "date-fns";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
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

export default function RidesCalendar({allEvents, setAllEvents}) {
    // for click event (modal/popup)
    const [clickEvent, setClickEvent] = useState(null);

    const handleEventClick = (event) => {
        // Handle the event click, you can show a modal or any other UI component
        console.log("Event Clicked:", event);
        // Implement your logic to display a large box with event details here
        // Stores in click event 
        setClickEvent(event);
    };

    return (
        <>
            <Calendar 
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.WEEK}
                style={{height:500, margin:"50px"}} 
                onSelectEvent={handleEventClick}
            />

            {clickEvent ?
                // If an event is clicked then display
                <div 
                    // Closes
                    onClick={() => setClickEvent(null)}
                    style={{zIndex: 4, height:500, margin:"50px",position:"absolute", width: "100%", height: "100%", display:"flex",
                            alignItems: "center", justifyContent: "center", top: 0}} 
                >
                    <div
                        // Prevents the object from closing if you click on it 
                        onClick={(e) => e.stopPropagation()}
                        style={{border: "2px solid #D3D3D3",borderRadius: "50px",height: 300, width: 300, backgroundColor: "#3174ad"}}
                    >
                        {/* content within the pop */}
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{clickEvent.title}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{clickEvent.start.toLocaleString()}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{clickEvent.seats+" seats available"}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{"Price: $"+clickEvent.cost}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{"Contact: "+clickEvent.contact}</h1>
                    </div>
                </div>
            // Else don't display
            : null }
        </>
    )
}
