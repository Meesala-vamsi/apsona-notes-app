import React, { useContext, useEffect, useState } from 'react';
import './Notes.css';
import { FaPalette } from 'react-icons/fa';
import { ReactContext } from '../../ReactContext/Context';
import axios from 'axios';
import { MdMoreVert, MdOutlineArchive } from 'react-icons/md';

const Notes = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showPopup, setShowPopup] = useState({});
  const [background, setBackground] = useState('#fff');
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const { token, notesData = [], setNotes, setArchieveData, setSidebarData } = useContext(ReactContext);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
    setTitle('');
    setNote('');
    setTags([]);
    setBackground('#fff');
  };

  useEffect(() => {
    const getNotes = async () => {
      const url = "https://apsona-notes-app.onrender.com/notes";
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setNotes(response.data.data.notes);
          setSidebarData(response.data.data.notes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    getNotes();
  }, [token,setArchieveData]);

  const addLabel = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLabel();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      noteSummary: note,
      tags,
      backgrounds: background
    };

    try {
      const response = await axios.post('https://apsona-notes-app.onrender.com/notes', newNote, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setSidebarData((prevNotes) => [...prevNotes, response.data.data.note]);
        setNotes((prevNotes) => [...prevNotes, response.data.data.note]);
        handleClose();
      }
    } catch (error) {
      console.error('Error posting note:', error);
    }
  };

  const togglePopup = (index) => {
    setShowPopup(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const onClickArchieve = async (id) => {
    const url = `https://apsona-notes-app.onrender.com/notes/${id}/archive`;
    try {
      await axios.post(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const moveToBin = async (id) => {
    const url = `https://apsona-notes-app.onrender.com/notes/${id}/bin`;
    try {
      const response = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        setSidebarData(prevNotes => prevNotes.filter(note => note._id !== id));
      }
    } catch (error) {
      console.error('Error moving note to bin:', error);
    }
  };

  const handleBackgroundChange = (color) => {
    setBackground(color);
    setColorPickerVisible(false);
    if (selectedNoteId) {
      updateNoteBackground(selectedNoteId, color);
    }
  };

  const updateNoteBackground = async (id, color) => {
    const url = `https://apsona-notes-app.onrender.com/notes/${id}`;
    try {
      await axios.patch(url, { backgrounds: color }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(prevNotes => prevNotes.map(note => (note._id === id ? { ...note, backgrounds: color } : note)));
    } catch (error) {
      console.error('Error updating note background:', error);
    }
  };

  return (
    <div className="notes-container">
      <div className='notes-input-container'>
        {!isExpanded ? (
          <div className="compact-note" onClick={handleExpand}>
            <input type="text" placeholder="Take a note..." className="compact-input" />
          </div>
        ) : (
          <form className="expanded-note" onSubmit={handleSubmit} style={{ backgroundColor: background }}>
            <input
              type="text"
              placeholder="Title"
              className="expanded-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Take a note..."
              className="expanded-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="expanded-icons">
              <FaPalette onClick={() => setColorPickerVisible(!isColorPickerVisible)} />
              <input
                type="text"
                placeholder="Add label"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
              />
              <button type="button" onClick={addLabel}>Add Tag</button>
              <button className="close-button" type="button" onClick={handleClose}>Close</button>
              <button className="close-button" type="submit">Submit</button>
            </div>
            <div className="tag-list">
              {tags.map((tag, index) => (
                <span key={index} className="tags-container">
                  <span className="tags-text">{tag}</span>
                  <button type="button" className="delete-button" onClick={() => setTags(tags.filter(t => t !== tag))}>×</button>
                </span>
              ))}
            </div>
          </form>
        )}
      </div>
      <ul className='notes-list-container'>
        {notesData.length > 0 ? notesData.map((eachNote, index) => (
          <li key={eachNote._id} className='list-items' style={{ backgroundColor: eachNote.backgrounds }}>
            <h1>{eachNote.title}</h1>
            <p>{eachNote.noteSummary}</p>
            {eachNote.tags.map((eachTag, tagIndex) => (
              <span className="tags-container" key={tagIndex}>
                <span className="tags-text">{eachTag}</span>
                <button className="delete-button">×</button>
              </span>
            ))}
            <div className="note-actions">
              <FaPalette onClick={() => { setColorPickerVisible(true); setSelectedNoteId(eachNote._id); }} style={{ cursor: "pointer" }} />
              <MdOutlineArchive onClick={() => onClickArchieve(eachNote._id)} style={{ cursor: "pointer" }} />
              <MdMoreVert onClick={() => togglePopup(index)} className="action-icon" />
              {showPopup[index] && (
                <div className="popup-menu">
                  <ul>
                    <li onClick={() => moveToBin(eachNote._id)}>Delete note</li>
                  </ul>
                </div>
              )}
              {isColorPickerVisible && (
                <div className="color-picker-popup">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => handleBackgroundChange(e.target.value)}
                  />
                </div>
              )}
            </div>
          </li>
        )) : <p>No notes available</p>}
      </ul>
    </div>
  );
};

export default Notes;
