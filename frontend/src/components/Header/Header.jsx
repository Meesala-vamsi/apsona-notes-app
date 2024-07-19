// Header.js
import { useContext } from "react";
import Cookies from "js-cookie"
import Search from "../Search/Search";
import "./Header.css"
import { IoMdMenu } from "react-icons/io";
import { ReactContext } from "../../ReactContext/Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {isSidebarVisible, setSidebarVisible} = useContext(ReactContext)
  const navigate=useNavigate()

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onClickLogout=()=>{
   const token = Cookies.remove("jwtToken")
   if(token===undefined){
    navigate("/login")
   }
  }

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <IoMdMenu className="menu-icon" onClick={toggleSidebar}/>
          <h1>Notes App</h1>
        </div>
        <Search />
        <div className="profile-container">
          <button onClick={onClickLogout}>Logout</button>
          <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className="profile-image" />
        </div>
      </div>
    </>
  );
}

export default Header;
