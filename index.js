require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

//import routes
const userRoutes = require("./routes/auth");
const projectRoute = require("./routes/projects");
const tasksRoute = require("./routes/tasks");

app.use((req, res, next) => {
  next();
});

// connexion à la base de donnée
app.use("/auth", userRoutes);
app.use("/project", projectRoute);
app.use("/tasks", tasksRoute);


app.listen(3003, () => {

  console.log(`app is listening on port ${port}`);
});