const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { brotliCompress } = require("zlib");

const taskRoutes = require('../src/Routes/tasks')

const routes = require("express").Router();

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;


routes.get('/',(req,res)=>{
  res.status(200).send("This is the taskmanager application");
});

routes.use('/tasks',taskRoutes);


app.listen(PORT, (error) => {
  if (!error) {
    console.log("server has started");
  } else {
    console.log("Some error has occured ");
  }
});
