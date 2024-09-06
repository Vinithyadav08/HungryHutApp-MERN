const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Pom9b2M5DHa1LpZ2oyJbMxK56BS4oQ1VakO9nJll0eEvxWu0ZKfRjJ8GyhbL99h11fcxM9SG9SMnCy7xgBbCioC009H7aDika"
); // Replace with your Stripe secret key
const router = express.Router();
//require("dotenv").config();

router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body; // Items from the cart

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price / 0.8388), // Convert dollars to cents
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://hungryhutapp-mern-server.onrender.com/success", // Replace with your success URL
      cancel_url: "https://hungryhutapp-mern-server.onrender.com/cancel", // Replace with your cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
