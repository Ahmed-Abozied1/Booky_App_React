import React from 'react'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import Joi from 'joi';

import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate=useNavigate();

const [errorList, setErrorList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState({
first_name:"",
age:0,
last_name:"",
password:"",
email:"",

  })
  function getUser(e) {
let myUser={...user};
myUser[e.target.name]=e.target.value;

setUser(myUser,user);

}
async function submitRegister(e) {
e.preventDefault();
setIsLoading(true);

let myValidate=validateRegister(user);
if (myValidate.error) {
  setIsLoading(false);

 setErrorList(myValidate.error.details)
}
else{
 let {data}= await axios.post(`https://route-movies-api.vercel.app/signup`,user);
if (data.message==="success") {
  setIsLoading(false)
  navigate("/login")

}
else
{
  setIsLoading(false);
setError(data.message)
// toast.error(data.message)
}
}

}


const validateRegister=(user)=>{
  let schema=Joi.object({
    first_name: Joi.string().alphanum().min(3).max(9).required(),
    last_name: Joi.string().alphanum().min(3).max(9).required(),
    age:Joi.number().min(17).max(80).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,9}$/),
  })
  return schema.validate(user,{abortEarly:false});
}
 
  return (
    <div>
      <h2 className='my-3'>REGISTER NOW</h2>
      {
      errorList.map((error,index)=>
      {
        if (index===4) {
      return    <div key={index} className='alert alert-danger'>"password" must start Capital letter</div>

        }
        else{
          return  <div key={index} className='alert alert-danger'>{error.message}</div>

        }
      }
      
     )}

{/*  */}

<form className='py-4' onSubmit={submitRegister}>
  {/* first_name */}
<label htmlFor="first_name">first_name</label>
<input type="text"onChange={getUser} className="form-control my-3" name="first_name" id='first_name'/>
{/* last_name */}
<label htmlFor="last_name">last_name</label>
<input type="text"onChange={getUser} className="form-control my-3" name="last_name" id='first_name'/>
{/* email */}
<label htmlFor="email">email</label>
<input type="email"onChange={getUser} className="form-control my-3" name="email" id='first_name'/>
{/* age */}
<label htmlFor="age">age</label>
<input type="number"onChange={getUser} className="form-control my-3" name="age" id='first_name'/>
{/* password */}
<label htmlFor="password">password</label>
<input type="password"onChange={getUser} className="form-control my-3" name="password" id='first_name'/>
<div className=' text-center'>
<Button type='submit'  className='m-2 ' variant="outline-secondary">
{isLoading? <Spinner animation="border" />:"Register"}

</Button>

</div>
</form>
<ToastContainer />

    </div>
  )

}
