import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // Function to get the current position
    // const getCurrentPosition = () => {
    //   return new Promise((resolve, reject) => {
    //     navigator.geolocation.getCurrentPosition(resolve, reject);
    //   });
    // };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, (error) => {
          reject(
            new Error(
              "Unable to fetch geolocation. Ensure you have granted permission."
            )
          );
        });
      });
    };


    try {
      // Fetch latitude and longitude
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);

      // Make the request to get location information
      const response = await fetch(
        "https://hungryhutapp-mern-server.onrender.com/getlocation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latlong: { lat: latitude, long: longitude } }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { location } = await response.json();
      console.log(location);

      // Update state with the fetched location
      setAddress(location);
      setCredentials((prev) => ({ ...prev, geolocation: location }));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://hungryhutapp-mern-server.onrender.com/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation,
          }),
        }
      );

      const json = await response.json();

      if (response.status === 400 && json.success === false) {
        alert("User already exists");
      } else if (response.ok && json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/login");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder='"Click below for fetching address"'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handleClick}
              name="geolocation"
              className=" btn btn-success"
            >
              Click for current Location{" "}
            </button>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
