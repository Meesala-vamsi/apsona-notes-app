import { useContext } from "react"
import Header from "../Header/Header"
import "./Home.css"
import { ReactContext } from "../../ReactContext/Context"
import Sidebar from "../Sidebar/Sidebar"
const Home = ({children})=>{
  const {isSidebarVisible}=useContext(ReactContext)
  return(
    <div>
    <Header/>
    <div className="home-container">
      <div>
        <Sidebar isVisible={isSidebarVisible} />
      </div>
      <div style={{width:"75%"}}>{children}</div>
    </div>
    
    </div>
  )
}

export default Home