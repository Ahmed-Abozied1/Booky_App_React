import { createContext, useContext } from "react";
import { useState } from 'react';

export let BookContext=createContext(null);

export const useBookContext=()=>{
    const context=useContext(BookContext);
    if (context===undefined) {
        throw new Error("BookContext must be within ContextProvider")
    }
    return context;

}
export function ContextProvider({children}) {
    
  const [favourite, setfavourite] = useState([])
 
  const addToFavourite=(book)=>{
    const oldFavourite=[...favourite];
    const newFavourite=oldFavourite.concat(book);
    setfavourite(newFavourite);

  }
  const removeFromFavourite=(id)=>{
    const oldFavourite=[...favourite];
    const newFavourite=oldFavourite.filter((book)=>book.id !==id);
    setfavourite(newFavourite);

  }
return  <BookContext.Provider value={{favourite,addToFavourite,removeFromFavourite}}>
{children}

</BookContext.Provider>

}


