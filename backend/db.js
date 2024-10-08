const express = require("express");
const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    // Define MongoDB connection URL directly
    const mongoURI =
      "mongodb+srv://hungryhut:vinu1234@cluster0.ccgqu.mongodb.net/hungryhutmern?retryWrites=true&w=majority&appName=Cluster0";

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
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
