import React, { useState, useEffect } from 'react'


const Header = ({ optionHeader }) => {
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <header className={`fade-in ${visible ? 'visible' : ''}`}>
        <div className="header-title">
          <h1>{optionHeader}</h1>
        </div>
      </header>
    );
};

export default Header