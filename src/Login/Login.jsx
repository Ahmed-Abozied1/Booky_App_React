import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();

  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;

    setUser(myUser, user);
  }
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    let myValidate = validateLogin(user);
    if (myValidate.error) {
      setIsLoading(false);

      setErrorList(myValidate.error.details);
    } else {
      let { data } = await axios.post(
        `https://route-movies-api.vercel.app/signin`,
        user
      );
      if (data.message === "success") {
        localStorage.setItem("userToken",data.token)
       props.getUserData();
        setIsLoading(false);
        navigate("/home");
      } else {
        setIsLoading(false);
        setError(data.message);
      }
    }
  }

  const validateLogin = (user) => {
    let schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/),
    });
    return schema.validate(user, { abortEarly: false });
  };

  return (
    <div>
      <h2 className="my-3">Login NOW</h2>
      {errorList.map((error, index) => {
        if (index === 4) {
          return (
            <div key={index} className="alert alert-danger">
              "password" must start Capital letter
            </div>
          );
        } else {
          return (
            <div key={index} className="alert alert-danger">
              {error.message}
            </div>
          );
        }
      })}

      {/*  */}

      <form className="py-4" onSubmit={submitLogin}>
        {/* email */}
        <label htmlFor="email">email</label>
        <input
          type="email"
          onChange={getUser}
          className="form-control my-3"
          name="email"
          id="first_name"
        />

        {/* password */}
        <label htmlFor="password">password</label>
        <input
          type="password"
          onChange={getUser}
          className="form-control my-3"
          name="password"
          id="first_name"
        />
        <div className=" text-center">
          <Button type="submit" className="m-2 " variant="outline-secondary">
            {isLoading ? <Spinner animation="border" /> : "Login"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
