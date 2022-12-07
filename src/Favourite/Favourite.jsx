import React from 'react';
import "./Favourite.css"
import { useBookContext } from "../DataContext";

 const  Favourite=()=> {


  const{favourite,addToFavourite,removeFromFavourite}=useBookContext();
  console.log("favourites :" , favourite);
  
  const favouritCheck=(id)=>{
const boolean=favourite.some((book)=>book.id===id);
return boolean;
  };
  return (
    <>
      <div className="row py-5 m-5">
         
            <br />
            <br />
           
        
          
       

        <div className="favourites">
          {favourite.length>0 ? favourite.map((book) => (
            <div key={book.id} className="book">
              
              <div>
                  <h5 className="h6">{book.title}</h5>
                </div>
                <div>
                  <img src={book.image_url} alt="#" />
                </div>
               
                <div>
                  {
                    favouritCheck(book.id)?  
                 
                  <button  className="button"onClick={()=>removeFromFavourite(book.id)} > Remove from Favourite</button>

                  :
                
                <button className="button" onClick={()=>addToFavourite(book)} > Add to Favourite</button>
                  }
                 
                </div>
            </div>
          )) :<h2 className='header'>You dont't have any Favourite books yet !</h2>}
       

        </div>
      </div>
    </>
  )
}
export default Favourite;