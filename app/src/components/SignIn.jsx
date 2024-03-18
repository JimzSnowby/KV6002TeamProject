import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";

/**
 * The SignIn component for the application.
 */
function SignIn(props) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [signInError, setSignInError] = useState(false)
    const errorColour = signInError ? "bg-red-200" : "bg-slate-100"
    const [roletype, setRoletype] = useState("")

   const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = parseJwt(token);
        console.log(decodedToken); // Check the structure of the decoded token
        const role = decodedToken.role; // Access the role field
        console.log(role); // Log the role
        props.setRoletype(decodedToken.role)

        // Now you can use the role as needed
        // For example, you might want to set some state based on the role
        // Or perform different actions based on different roles

        switch (role) {
            case "participant":
                break;
            case "admin":
                break;
            case "volunteer":
                break;
            default:
                break;
    }

    // Rest of your useEffect code...
    } [props.signedIn]});

    const signIn = () => {
        const encodedString = btoa(username + ':' + password)
        
        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/token',
            {
                method: 'GET',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    props.setSignedIn(true)
                    setSignInError(false)
                } else {
                    setSignInError(true)
                }
                return response.json()
            })
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
            })
            
            .catch(error => console.log(error))
            

            
        
            
    }

    const signOut = () => {
        localStorage.removeItem("token")
        setUserName("")
        setPassword("")
        props.setSignedIn(false)
    }

    return (
        <div className="bg-blue-800 p-2 text-md text-right rounded-md">
            {!props.signedIn && <div>
                <input
                    type="text"
                    placeholder="Username"
                    className={'p-1 mx-2 rounded-md' + errorColour}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={'p-1 mx-2 rounded-md' + errorColour}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    value="Sign In"
                    className="py-1 px-2 mx-2 bg-blue-100 hover:bg-blue-500 rounded-md"
                    onClick={signIn}
                />
            </div>
            }
            {props.signedIn && <div>
                <input
                    type="submit"
                    value="Sign Out"
                    className="py-1 px-2 mx-2 bg-blue-100 hover:bg-blue-500 rounded-md"
                    onClick={signOut}
                />
            </div>
            }
            {signInError}
        </div>
    )
}

export default SignIn