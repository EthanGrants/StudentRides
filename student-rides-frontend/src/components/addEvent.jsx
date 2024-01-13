import React, { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

export default function Home() {
    const dateRef = useRef();           // date of departure
    const destinationRef = useRef();    // destination from UCSB
    const seatsRef = useRef();          // open seats
    const ref = collection(firestore, "events")

    const handleSave = async(e) => {
        e.preventDefault();
        
        let data = {
            date: dateRef.current.value,
            destination: destinationRef.current.value,
            seats: seatsRef.current.value,
        }
        
        try {
            addDoc(ref, data);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Post a ride!</label>
                <input type="date" ref={dateRef} />
                <input type="text" ref={destinationRef} placeholder="i.e. San Luis Opisbo" />
                <input type="number" ref={seatsRef} placeholder="i.e. 4" />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}