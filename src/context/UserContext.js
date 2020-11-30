import React, {useState, createContext} from 'react'

const UserContext = createContext([{}, p => {}])

const UserProvider = (props) => {
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        uid: "",
        isLoggedIn: null,
        profilePhotoUrl: "default",
    });
    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>
}
export { UserContext, UserProvider };