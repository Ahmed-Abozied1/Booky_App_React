import axios from "axios";
import React from "react";

import "./Home.css";
import { useEffect, useState } from "react";
import { useBookContext } from "../DataContext";
import { BASE_URL } from "../Api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setbooks] = useState([]);
  const { favourite, addToFavourite, removeFromFavourite } = useBookContext();
  console.log("favourites :", favourite);
  const navigate = useNavigate();
  const favouritCheck = (id) => {
    const boolean = favourite.some((book) => book.id === id);
    return boolean;
  };
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        console.log(res.data);
        setbooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="row py-4">
        <div className="col-md-4 py-3 m-5">
          <div className="brdr w-25 my-3"></div>
          <h2 className="h3 my-2">
            Trending
            <br />
            Books
            <br />
            To Read Now
          </h2>
          <p className="text-muted">
            Regular reading is a great exercise for your brain.
          </p>
          <div className="brdr  my-3"></div>
        </div>

        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book">
              <div>
                <img
                  onClick={() => navigate(`/books/${book.id}`)}
                  src={book.image_url}
                  alt="#"
                />
              </div>

              <div>
                {favouritCheck(book.id) ? (
                  <button
                    className="button"
                    onClick={() => removeFromFavourite(book.id)}
                  >
                    {" "}
                    Remove from Favourite
                  </button>
                ) : (
                  <button
                    className="button"
                    onClick={() => addToFavourite(book)}
                  >
                    {" "}
                    Add to Favourite
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
