import axios from "axios";
import { createContext, useEffect, useState } from "react";
// const token = localStorage.getItem("token"); 
export const UserContext = createContext({});

export  function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready,setReady] = useState(false)
  useEffect(() => {
    // axios.get('/profile')
    if (!user) {
      axios.get('http://localhost:5000/profile',{
        withCredentials: true,
      }).then(({ data }) => {
        setUser(data);
        setReady(true)
      });
    }
  },[]);
  return (
    <UserContext.Provider value={{ user, setUser,ready }}>
      {children}
    </UserContext.Provider>
  );
}
