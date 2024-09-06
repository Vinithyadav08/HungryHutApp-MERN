const express = require("express");
const Order = require("../models/Orders");
const router = express.Router();
const axios = require("axios");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  const email = req.body.email;
  if (!email) {
    return res.status(400).send("Email is required.");
  }
  try {
    // Check if email exists
    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      // If email doesn't exist, create a new order
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      return res.status(200).json({ success: true });
    } else {
      // If email exists, update the existing order
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    // Send proper status code and error message
    return res.status(500).send("Server Error: " + error.message);
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    console.log(req.body.email);
    let myData = await Order.findOne({ email: req.body.email });
    res.status(200).json({ orderData: myData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.post("/getlocation", async (req, res) => {
  try {
    let lat = req.body.latlong.lat;
    let long = req.body.latlong.long;
    let location = await axios
      .get(
        "https://api.opencagedata.com/geocode/v1/json?q=" +
          lat +
          "+" +
          long +
          "&key=4e18d93b459648aba6c345553aecb92e"
      )
      .then(async (res) => {
        let response = res.data.results[0].components;
        let { county, state_district, state, postcode } = response;
        return String(
          county + "," + state_district + "," + state + "\n" + postcode
        );
      })
      .catch((error) => {
        console.error(error);
      });
    res.status(200).json({ location });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/getuser", async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
