import { IoIosSearch } from "react-icons/io";
import "./Search.css";
import { useContext, useState, useEffect } from "react";
import { ReactContext } from "../../ReactContext/Context";

const Search = () => {
  const { notesData, setNotes } = useContext(ReactContext);
  const [originalNotes, setOriginalNotes] = useState(notesData);

  useEffect(() => {
    setOriginalNotes(notesData);
  }, [notesData]);

  const onChangeInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setNotes(originalNotes);
    } else {
      const filteredData = originalNotes.filter((eachNote) =>
        eachNote.title && eachNote.title.toLowerCase().includes(searchValue)
      );
      setNotes(filteredData);
    }
  };

  return (
    <div className="search-main">
      <div className="search-container">
        <IoIosSearch className="search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Search notes..."
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default Search;
