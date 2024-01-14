import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from "./components/AuthDetails"
import AddEvent from "./components/addEvent"
import RidesCalendar from './components/calendar';
import { useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  // allEvents initialized to the current data in Firestore
  const [allEvents, setAllEvents] = useState();
  // determine if user is logged in
  const [isAuth, setIsAuth] = useState(false);
  
  const userSignOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false)
      console.log("Sign out was successful")
    }).catch(error => console.log(error))
  }
  return (
    <div className="App">
      <h1>Student Rides</h1>
      {!isAuth ? (
        <>
          <SignUp />
          <SignIn setIsAuth={setIsAuth}/>
        </>
      ) : (
        <>
          <AddEvent allEvents={allEvents} setAllEvents={setAllEvents}/>
          <button onClick={userSignOut}>Log Out</button>
        </>
      )}
      {/* <AuthDetails /> */}
      <RidesCalendar allEvents={allEvents} setAllEvents={setAllEvents}/>
    </div>
  );
}

export default App;
