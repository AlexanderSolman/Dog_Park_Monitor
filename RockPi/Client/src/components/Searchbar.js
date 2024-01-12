import React, {useState} from 'react'

const SearchBar = ({ handleSearch, backendData }) => {
    const [selectedOption, setSelectedOption] = useState("bergsbrunna");
  
    const handleOptionSelect = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleSearchClick = () => {
      handleSearch(selectedOption)
    };
  
    return (
      <div className="selection-bar">
        <div className='selection-group'>
          <div className="selection">
            <select value={selectedOption} onChange={handleOptionSelect}>
              <option value="bergsbrunna">Bergsbrunna</option>
              <option value="nantuna_xl">Nåntuna Stor</option>
              <option value="nantuna_s">Nåntuna Liten</option>
            </select>
          </div>
          <div className="selection-button">
            <button onClick={handleSearchClick}>Sök</button>
          </div>
        </div>
        <div className="db-response">
            {backendData.length > 0 && (
              <>
                <div className={`circle ${backendData[0].count > 0 ? 'red' : 'green'}`}></div>
                <div className={`date-time ${backendData[0].count > 0 ? 'red-text' : 'green-text'}`}>
                  {new Date(backendData[0].datetime).toLocaleString()}
                </div>
              </>
            )}
        </div>
      </div>
    );
};


export default SearchBar;