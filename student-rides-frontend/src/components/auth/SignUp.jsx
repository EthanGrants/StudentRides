import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        if(password.length < 6) {
            alert("Password must be at least 6 characters long");
            return; // Stop further execution
        }
        else {
            alert("Success!");
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="sign-in">
            <form onSubmit={signUp}>
                <h2>Create Account</h2>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;