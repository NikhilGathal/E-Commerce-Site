import React, { useEffect, useRef, useState } from 'react'
// import './Search.css'
export default function SearchBar({ setquery }) {
  let element = document.querySelector('.list-contain')


  const listContainRef = useRef(null);
  const inputRef = useRef(null);

  const [query1, setQuery1] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const data = ['jewelery', "men's clothing", 'electronics', "women's clothing"]
  // const handleChange = (e) => {
  //   let filteredSuggestions
  //   const value = e.target.value;
  //   setQuery1(value);
  //   let element = document.querySelector('.list-contain')
  //   element.classList.add('visible')
  //   // if(e.target.value === '' )
  //   // {

  //   // }
  //   // Filter data based on user input
  //   if (value.length > 0) {
  //      filteredSuggestions = data.filter(item =>
  //       item.toLowerCase().includes(value.toLowerCase()));
  //     console.log(filteredSuggestions);

  //     if (filteredSuggestions.length > 0 ) {
  //       element.classList.add('visible');
  //     } 
  //     else if (filteredSuggestions.length === 4) {
  //       element.classList.remove('visible');
  //     }
  //     else {
  //       element.classList.remove('visible');
  //     }
  //     setSuggestions(filteredSuggestions);
  //     element.classList.remove('visible');
  //   }    
  //   else {
  //     setSuggestions([]);
  //   }

  //   setquery(e.target.value.toLowerCase())
  // };



  const handleChange = (e) => {
    const value = e.target.value;
    setQuery1(value);

    let element = document.querySelector('.list-contain');

    // Filter data based on user input
    if (value.length > 0) {
      const filteredSuggestions = data.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      console.log(filteredSuggestions);

      // Add or remove the 'visible' class based on suggestions
      if (filteredSuggestions.length > 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    } else {
      // Clear suggestions and remove the 'visible' class when the input is cleared
      setSuggestions([]);
      element.classList.remove('visible');
    }

    setquery(value.toLowerCase());
  };
  const handleSuggestionClick = (suggestion) => {

    setquery(suggestion)
    element.classList.remove('visible')
    setQuery1(suggestion);
    setSuggestions([]);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listContainRef.current &&
        !listContainRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        listContainRef.current.classList.remove('visible');
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (

    <>
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={handleChange} ref={inputRef}
          type="text" value={query1} placeholder="Search for a Category..." />

        <div className='list-contain'  ref={listContainRef}>
          <ul >
            {suggestions.map((suggestion, index) => (
              <li className='list-item' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>


      </div>



    </>
  )
}

