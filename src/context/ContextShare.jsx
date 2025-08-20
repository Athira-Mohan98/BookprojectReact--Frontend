import React, { createContext, useState } from 'react'

export const SearchContext = createContext("")

function ContextShare({children}) {

    const [SearchKey,setSearchKey]=useState("")

  return (
    <div>
      <SearchContext.Provider value={{SearchKey,setSearchKey}}>
      {
        children
      }
      </SearchContext.Provider>
    </div>
  )
}

export default ContextShare
