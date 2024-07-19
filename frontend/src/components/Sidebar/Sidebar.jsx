import React, { useContext } from 'react';
import './Sidebar.css';
import { ReactContext } from '../../ReactContext/Context';
import { MdLightbulbOutline } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ isVisible }) => {
  const { setSelectedOption, notesData, setNotes, token, getSidebarData } = useContext(ReactContext);

  const handleItemClick = async (option) => {
    setSelectedOption(option);

    if (option === "Notes") {
      const url = "https://apsona-notes-app.onrender.com/notes";
      await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setNotes(response.data.data.notes);
        }
      });
    }
  };

  const getUniqueTags = (notesData) => {
    const tagSet = new Set();
    getSidebarData.forEach(note => {
      note.tags.forEach(tag => {
        tagSet.add(tag);
      });
    });
    return Array.from(tagSet);
  };

  const filterData = (tag) => {
    const filteredNotes = getSidebarData.filter(note => note.tags && note.tags.includes(tag));
    setNotes(filteredNotes);
  };

  const uniqueTags = getUniqueTags(notesData);

  return (
    <div className={`sidebar-container ${isVisible ? 'visible' : 'hidden'}`}>
      <ul>
        <Link to="/" className='nav-link'>
          <li onClick={() => handleItemClick("Notes")} className='sidebar-list-items'>
            <MdLightbulbOutline /> Notes
          </li>
        </Link>
        {uniqueTags.length > 0 && uniqueTags.map((tag, index) => (
          <li key={index} className='sidebar-list-items' onClick={() => filterData(tag)}>
            <MdLabelOutline /> {tag}
          </li>
        ))}
        <Link to="/archive" className='nav-link'>
        <li className='sidebar-list-items'>
          <MdOutlineArchive /> Archive
        </li>
        </Link>
        <Link to="/bin" className='nav-link'>
        <li className='sidebar-list-items'>
          <ImBin /> Bin
        </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
