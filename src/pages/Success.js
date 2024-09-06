import React from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../components/Images/succ.jpeg";
import back from "../components/Images/back.jpg";
import back2 from "../components/Images/topleft.jpeg"

export default function Success() {
  let navigate = useNavigate();

  const handleContinueOrder = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${back})`, // Set the background image for the outer container
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
          backgroundImage: `url(${successImage})`,
          backgroundSize: "auto 100%", // Reduce size vertically to 50%
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          color: "#fff",
          overflow: "hidden",
          marginLeft: "1100px",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", color: "#28a745", marginTop: "200px" }}
        >
          🎉 Payment Successful! 🎉
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#6c757d" }}>
          Thank you for your purchase. 🍽️
        </p>
        <button
          onClick={handleContinueOrder}
          className="btn btn-success btn-lg"
          style={{ marginTop: "20px" }}
        >
          Continue Order 🛒
        </button>
        <div
          style={{
            position: "absolute",
            top: "-10%", // Adjust top position as needed
            left: "50%",
            transform: "translate(-34%, 0)", // Center the image horizontally
            width: "30%", // Adjust width if needed
            height: "60%", // Set a specific height for the image container
            backgroundImage: `url(${back2})`,
            backgroundSize: "cover", // Ensure the image covers the container
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            zIndex: 1, // Ensure it is visible but not covering other important content
            backgroundColor: "#000", // Optional: Add a background color to make the image stand out
            borderRadius:"30px"
        }}
        ></div>
      </div>
    </div>
  );
}
