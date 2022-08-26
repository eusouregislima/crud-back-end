const express = require("express");
const uuid = require("uuid");

const cors = require("cors");

const app = express();
const port = process.env.port || 3001;
app.use(express.json());
app.use(cors());

const users = [];

const checkId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex((index) => index.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found." });
  }

  userId = id;
  userIndex = index;

  next();
};

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { firstname, lastname, username, phone, email, city, cep, address } =
    request.body;

  const newUser = {
    id: uuid.v4(),
    firstname,
    lastname,
    username,
    phone,
    email,
    city,
    cep,
    address,
  };

  users.push(newUser);
  return response.status(201).json(newUser);
});

app.put("/user/:id", checkId, (request, response) => {
  const { id } = request.params;
  const { firstname, lastname, username, phone, email, city, cep, address } =
    request.body;

  const changeUser = {
    id,
    firstname,
    lastname,
    username,
    phone,
    email,
    city,
    cep,
    address,
  };

  users[userIndex] = changeUser;

  return response.json(changeUser);
});

app.delete("/user/:id", checkId, (request, response) => {
  users.splice(userIndex, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
