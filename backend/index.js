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
app.use("/stripe", stripeRoutes);
app.use("/", require("./Routes/CreateUser"));
app.use("/", require("./Routes/DisplayData"));
app.use("/", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
