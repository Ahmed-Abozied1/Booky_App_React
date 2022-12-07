import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { DETAILS_URL } from '../Api';
import "./BookDetails.css"
export default function BookDetails() {

  const {id}=useParams();
const [book, setBook] = useState({});


useEffect(() => {
  axios.get(`${DETAILS_URL}/${id}`).then(res=>{
    setBook(res.data);
  }).catch(err=>{
    console.log(err);
  })

 
}, [id]);


  return (
    <div className='book-details '>

<div className='m-5'>

<img src={book?.image_url} alt="#" />
<h2 className='text-center'>{book?.title}</h2>
</div>
<div>

  <h2>Description</h2>
  <p>{book.description}</p>
  <h2>Authors</h2>
  <p>{book?.authors }</p>
  <h2>Genres</h2>
  <p>{book?.genres }</p>

</div>
    </div>
  )
}
