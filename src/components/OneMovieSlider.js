import { useState, useEffect } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import data from "../data";
import "./OneMovieSlider.css";

// Filmy se ve slideru točí stále dokola
const OneMovieSLider = () => {
  const [index, setIndex] = useState(5);

  useEffect(() => {
    if (index < 0) {
      setIndex(data.length - 1);
    } else if (index > data.length - 1) {
      setIndex(0);
    }
  }, [index]); //useEffect se spustí jen při změně indexu

  // Filmy se točí automaticky v intervalech
  useEffect(() => {
    let setIntervalId = setInterval(() => {
      setIndex(index + 1);
    }, 3000); //číslo je v milisekundách
    return () => clearInterval(setIntervalId);
  }, [index]);

  return (
    <section className="all-movies">
      <div className="all-movies-content">
        {data.map((oneMovie, oneMovieIndex) => {
          const { id, title, image, description } = oneMovie;

          let mainClass = "next-slide";

          if (oneMovieIndex === index) {
            mainClass = "active-slide";
          }

          if (
            oneMovieIndex === index - 1 ||
            (index === 0 && oneMovieIndex === data.length - 1)
          ) {
            mainClass = "last-slide";
          }

          return (
            <article key={id} className={mainClass}>
              <img src={image} alt="" />
              <h1>{title}</h1>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={() => setIndex(index - 1)}>
          <FaArrowCircleLeft></FaArrowCircleLeft>
        </button>
        <button onClick={() => setIndex(index + 1)}>
          <FaArrowCircleRight></FaArrowCircleRight>
        </button>
      </div>
    </section>
  );
};

export default OneMovieSLider;
