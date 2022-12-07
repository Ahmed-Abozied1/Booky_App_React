import "./App.css";
import  {useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Favourite from "./Favourite/Favourite";
import BookDetails from "./BookDetials/BookDetails";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ContextProvider } from "./DataContext";
function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserDate();
    }
  }, []);

  function getUserDate() {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUserData(decodedToken);
  }
  // logout
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  // Auth
  function Auth({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }
  return (
    <div>
      <NavBar userData={userData} logOut={logOut} />
      <div className="container">
      <ContextProvider>

     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          
         <Route
            path="/favourite"
            element={
              <Auth>
                <Favourite />
              </Auth>
            }
          />
          
           <Route
            path="/books/:id"
            element={
              <Auth>
                <BookDetails />
              </Auth>
            }
          />
        
          <Route path="/Login" element={<Login getUserData={getUserDate} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h2 className="text-center">Page Not Found !</h2>} />
        </Routes>
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;
