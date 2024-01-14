import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

const SignIn = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsAuth(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="sign-in">
            <form onSubmit={signIn}>
                <h2>Log In</h2>
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

export default SignIn;