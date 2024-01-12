import Header from './components/Header'
import Navbar from './components/Navbar'
import Background from './components/Background'
import SearchBar from './components/Searchbar'

import React, { useState, useEffect, useRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function App() {
  const parallaxRef = useRef();
  const [backendData, setBackendData] = useState([]);

  /* async fetch from backend called with selected option*/
  const fetchData = async (selectedOption) => {
    try {
      const response = await fetch(`http://address-to-backend-or-proxy/api/data/${selectedOption}`);
      const data = await response.json();
      setBackendData(data);
    } catch (error) {
      console.error(error);
    }
  };

  /* Default option upon load */
  useEffect(() => {
    fetchData("bergsbrunna");
  }, []);

  return (
    <div>
      <Background />
      <Parallax ref={parallaxRef} pages={2}>
        <ParallaxLayer offset={0} speed={0}>
          <Navbar parallaxRef={parallaxRef} />
          <SearchBar handleSearch={fetchData} backendData={backendData}/>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <Header optionHeader={"Info"} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
