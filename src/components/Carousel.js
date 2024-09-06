import React from "react";
import food1 from "../components/Images/food1.jpg";
import food2 from "../components/Images/food2.jpg";
import food3 from "../components/Images/food3.jpg";
import food4 from "../components/Images/food4.jpg";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner " id="carousel">
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">
              {" "}
              {/* justify-content-center, copy this <form> from navbar for search box */}
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Type in..."
                aria-label="Search"
              />
              <button className="btn text-white bg-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item">
            <img
              src={food1}
              className="d-block w-100"
              style={{
                filter: "brightness(80%)",
                width: "100px",
                height: "560px",
                objectFit: "cover",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={food2}
              className="d-block w-100 "
              style={{
                filter: "brightness(80%)",
                width: "900px",
                height: "560px",
                objectFit: "cover",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={food3}
              className="d-block w-100 "
              style={{
                filter: "brightness(80%)",
                width: "900px",
                height: "560px",
                objectFit: "cover",
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={food4}
              className="d-block w-100 "
              style={{
                filter: "brightness(80%)",
                width: "900px", 
                height: "560px",
                objectFit: "cover",
              }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            style={{
              filter: "brightness(550%)"
            }}
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            style={{
              filter: "brightness(550%)" /* Increase brightness */,
            }}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
