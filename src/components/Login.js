import { useState } from "react";

import { useUserContext } from "../hooks/useUserContext";
import AccountLanding from "../pages/AccountLanding";

const Login = ({port}) => {
    // const [first_name, setfname] = useState("");
    // const [last_name, setlname] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("");
    const { user, setUser } = useUserContext();
   
    //refactor: make an object with the entire user schema in the context/state
    //use only one context for all info 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");

        const userdata = { email,password};

        const response = await fetch('https://sore-visor-dove.cyclic.app/bookbandits/Login', {
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log("json user", json.user);
        const b = json.user._id
         
        if (!b ) {
            setError("Your Email is wrong or your password false. Please try again.")

        } else {
            setUser(json.user)
        }
        /*if (!json.bbooks === []) {setbBooks((prev) => [...prev  , ...json.bbooks]) }*/

        if (response.ok) {
            // setfname("");
            // setlname("");
            setPassword("")
            
          
           
           console.log(b)
           
            ;
        } else {
            setError(json.user.error);
            console.log(error)
        }
    };

    return (
         <div className='login w-full h-screen  pt-12 pb-12 px-4 mt-6 '>
            {error ? <div>{error}</div> : user._id ? user._id && <AccountLanding /> : <form className='signin' onSubmit={handleSubmit}>
                <label className="text-left">Email</label>
                <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} className="  bg-white bg-opacity-90 rounded-full border-2 border-transparent focus:border-white focus:border-opacity-50 focus:outline-none px-3 py-1 leading-none text-sm  transition-colors placeholder-white placeholder-opacity-50 my-2"/>
                <div className="text-left flex flex-col">
                {/* <label>First Name</label>
                <input type='text' onChange={(e) => setfname(e.target.value)} value={first_name} className="  bg-white bg-opacity-90 rounded-full border-2 border-transparent focus:border-white focus:border-opacity-50 focus:outline-none px-3 py-1 leading-none text-sm  transition-colors placeholder-white placeholder-opacity-50 my-2"/>

                <label>Last Name</label>
                <input type='text' onChange={(e) => setlname(e.target.value)} value={last_name} className="  bg-white bg-opacity-90 rounded-full border-2 border-transparent focus:border-white focus:border-opacity-50 focus:outline-none px-3 py-1 leading-none text-sm  transition-colors placeholder-white placeholder-opacity-50 my-2"/> */}

                <label>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className="  bg-white bg-opacity-90 rounded-full border-2 border-transparent focus:border-white focus:border-opacity-50 focus:outline-none px-3 py-1 leading-none text-sm  transition-colors placeholder-white placeholder-opacity-50 my-2"/> </div>
                <div className="flex justify-center pt-2">
                <button type='submit' className=' bg-white bg-opacity-90 px-6 py-2 w-fit font-medium text-xs leading-tight  rounded-full  hover:bg-orange-400  focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor:pointer my-2' >Log In</button> </div> 

            </form>}
          
        </div>
    );
};

export default Login;
