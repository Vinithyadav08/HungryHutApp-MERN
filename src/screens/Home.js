import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import food1 from "../components/Images/food1.jpg";
import food2 from "../components/Images/food2.jpg";
import food3 from "../components/Images/food3.jpg";
import food4 from "../components/Images/food4.jpg";


export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    response = await response.json();
    // console.log(response[0],response[1 ])
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);



  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner " id="carousel">
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">
              {" "}
              {}
              <input
                className="form-control me-2 w-75 bg-dark text-light"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ color: "white" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={food1}
              className="d-block w-100  "
              style={{
                filter: "brightness(80%)",
                width: "900px",
                height: "500px",
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
                height: "500px",
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
                height: "500px",
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
                height: "500px",
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
              filter: "brightness(550%)",
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
              filter: "brightness(550%)",
            }}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data.id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr
                  id="hr-success"
                  style={{
                    height: "4px",
                    backgroundImage:
                      "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                  }}
                />
                {foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems.id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No categories found.</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
