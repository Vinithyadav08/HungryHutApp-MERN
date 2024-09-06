import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  let navigate = useNavigate();

  const handleRetryOrder = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8d7da",
        textAlign: "center",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#dc3545" }}>
        ❌ Payment Canceled ❌
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#721c24" }}>
        Your payment was canceled. 🍽️ Please try again.
      </p>
      <button
        onClick={handleRetryOrder}
        className="btn btn-danger btn-lg"
        style={{ marginTop: "20px" }}
      >
        Retry Order 🔄
      </button>
    </div>
  );
}
