const express = require("express");
const app = express();
const port = process.env.PORT||5000;
//const port = 5000;
const mongoDB = require("./db");

const stripeRoutes = require("./Routes/stripe");
// Initialize MongoDB connection
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/stripe", require("./Routes/stripe"));
app.use("/api/createuser", require("./Routes/CreateUser"));
app.use("/api/displaydata", require("./Routes/DisplayData"));
app.use("/api/orderdata", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
