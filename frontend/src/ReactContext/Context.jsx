import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie"

export const ReactContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const [token, setToken] = useState(Cookies.get('jwtToken') || '');
  const [selectedOption, setSelectedOption] = useState("Home");
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [getSidebarData,setSidebarData] = useState([])
  const [notesData,setNotes] = useState([])
  const [archieveData,setArchieveData] = useState([])

  let url = "https://apsona-notes-app.onrender.com/auth";

  useEffect(()=>{

  },[token,notesData,archieveData])
  return (
    <ReactContext.Provider value={{ url, token,getSidebarData,setSidebarData,archieveData,setArchieveData, userData,notesData,setNotes, setUserData, setToken,selectedOption, setSelectedOption,isSidebarVisible, setSidebarVisible }}>
      {children}
    </ReactContext.Provider>
  );
};
