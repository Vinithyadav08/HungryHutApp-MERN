import React from "react";
import Delete from "@mui/icons-material/Delete";
//import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { loadStripe } from "@stripe/stripe-js";
//require("dotenv").config();

//const stripePromise = loadStripe(STRIPE_PK);
const stripePromise = loadStripe(
  "pk_test_51Pom9b2M5DHa1LpZniQbsSheUBN2OW5MwSMHGYUqrgip64bO7CfjROFIFGMNseJP7vUEw4QgAwHP1rmKHRdiwkQK00snCNWXNx"
);

// Replace with your Stripe publishable key

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const stripe = await stripePromise;

    let respon = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
     if (respon.status === 200) {
       dispatch({ type: "DROP" });
     }

    const response = await fetch(
      "http://localhost:5000/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: data,
          email: userEmail,
        }),
      }
    );
    

    const sessionId = await response.json();
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId.id,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  let totalPrice = data.reduce(
    (total, food) => total + food.price * food.qty,
    0
  );

  return (
    <div>
      {data.length === 0 ? (
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      ) : (
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <table className="table table-hover">
            <thead className="text-success fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={food.img}
                      alt={food.name}
                      style={{ height: "80px", objectFit: "cover" }}
                    />
                    <br />
                    {food.name}
                  </td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>₹{food.price.toFixed(2)}</td>
                  <td>
                    <button type="button" className="btn p-0">
                      <Delete
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1 className="fs-2">Total Price: ₹{totalPrice.toFixed(2)}</h1>
          </div>
          <div>
            <button className="btn bg-success mt-5" onClick={handleCheckOut}>
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
