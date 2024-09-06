const express = require("express");

require("dotenv").config(); // Ensure this is at the top of your file
const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    // Verify that MONGO_URI is defined
    if (
      "mongodb+srv://hungryhut:vinu1234@cluster0.ccgqu.mongodb.net/hungryhutmern?retryWrites=true&w=majority&appName=Cluster0"
    ) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    // Connect to MongoDB
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    await mongoose.connect(
      "mongodb+srv://hungryhut:vinu1234@cluster0.ccgqu.mongodb.net/hungryhutmern?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected successfully to MongoDB");

    // Fetch data from collections
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    // Store data in global variables
    global.food_items = foodItems;
    global.foodCategory = foodCategories;

    console.log("Data successfully fetched and stored in global variables");
  } catch (error) {
    console.error("Error connecting to MongoDB or fetching data:", error);
  }
};

module.exports = mongoDB;
