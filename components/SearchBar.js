import React from 'react'
export default  function SearchBar({query ,setquery}) {
  return (
    <div className="search-container">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input   onChange={(e) => 
      {
        setquery(e.target.value.toLowerCase())

      }
    }  type="text" value={query} placeholder="Search for a Category..."/>
  </div>
  )
}

