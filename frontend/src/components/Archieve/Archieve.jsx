import React, { useContext, useEffect, useState } from 'react';
import { ReactContext } from '../../ReactContext/Context';
import { FaPalette } from 'react-icons/fa';
import { MdMoreVert, MdOutlineArchive } from 'react-icons/md';
import axios from 'axios';

const Archieve = () => {
  const { token, archieveData, setArchieveData, setNotes, setSidebarData } = useContext(ReactContext);
  const [showPopup, setShowPopup] = useState({});

  useEffect(() => {
    const getArchivedData = async () => {
      const url = "https://apsona-notes-app.onrender.com/notes/archive";
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setArchieveData(response.data.data.archives);
          setSidebarData(response.data.data.archives);
        }
      } catch (error) {
        console.error('Error fetching archived notes:', error);
      }
    };

    getArchivedData();
  }, [token, setArchieveData, setSidebarData]);

  const togglePopup = (index) => {
    setShowPopup(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const deleteNote = async (id) => {
    const url = `https://apsona-notes-app.onrender.com/notes/${id}`;
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArchieveData(prevData => prevData.filter(note => note._id !== id));
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const onClickUnArchieve = async (id) => {
    const url = `https://apsona-notes-app.onrender.com/notes/${id}/unarchive`;
    try {
      const response = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setArchieveData(prevData => prevData.filter(note => note._id !== id));
        setNotes(prevNotes => [...prevNotes, response.data.data.note]);
      }
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  return (
    <div className="archive-container">
      <ul className='notes-list-container'>
        {archieveData.map((eachNote, index) => (
          <li key={eachNote._id} className='list-items'>
            <h1>{eachNote.title}</h1>
            <p>{eachNote.noteSummary}</p>
            {eachNote.tags.map((eachTag, tagIndex) => (
              <span className="tags-container" key={tagIndex}>
                <span className="tags-text">{eachTag}</span>
                <button className="delete-button">×</button>
              </span>
            ))}
            <div className="note-actions">
              <FaPalette className="action-icon" />
              <MdOutlineArchive onClick={() => onClickUnArchieve(eachNote._id)} />
              <MdMoreVert onClick={() => togglePopup(index)} className="action-icon" />
              {showPopup[index] && (
                <div className="popup-menu">
                  <ul>
                    <li onClick={() => deleteNote(eachNote._id)}>Delete note</li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Archieve;
