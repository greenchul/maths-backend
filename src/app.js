const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:9000/mongo");

const db = mongoose.connection;

const schema = new mongoose.Schema({ user: "string", score: "string" });
const User = mongoose.model("User", schema);

app.get("/", (request, response) => {
  response.status(200).send("Hello World!");
});

app.post("/users", (request, response) => {
  const { user, score } = request.body;
  User.create({ user: user, score: score }, (error, user) => {
    if (error) {
      console.log(error);
      response.status(500).send("There has been an error");
    } else {
      console.log(user);
      response.status(201).send(user);
    }
  });
});

module.exports = app;
