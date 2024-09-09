const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT||5000;
//const port = 5000;
const mongoDB = require("./db");

const stripeRoutes = require("./Routes/stripe");
// Initialize MongoDB connection
mongoDB();

const cors = require("cors");

const allowedOrigins = [
  "https://hungryhutapp-mern.onrender.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));







// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://hungryhutapp-mern-client.onrender.com"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://hungryhutapp-mern-client.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
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
