import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ReactContext } from "../../ReactContext/Context"


const Bin=()=>{
  const [getBinData,setBinData] = useState([])
  const {token} = useContext(ReactContext)
  useEffect(()=>{
    const getDeletedData =async()=>{
      const url ="https://notes-backend-sx63.onrender.com/notes/bin"
      await axios.get(url,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((response)=>{
        setBinData(response.data.data.binData)
      })
    }

    getDeletedData()
  },[])
  return(
    <div>
      <ul className='notes-list-container'>
        {getBinData.map((eachNote, index) => (
          <li key={eachNote._id} className='list-items'>
            <h1>{eachNote.title}</h1>
            <p>{eachNote.noteSummary}</p>
            {eachNote.tags.map((eachTag, tagIndex) => (
              <span className="tags-container" key={tagIndex}>
              <span className="tags-text">{eachTag}</span>
              <button className="delete-button" >×</button>
            </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bin