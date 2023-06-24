const taskData = require("../tasks.json");
const taskRoutes = require("express").Router();
const bodyParser = require("body-parser");
const path = require("path");
const Validator = require("../Helpers/Validator");
const fs = require("fs");
const { stringify } = require("qs");
const { takeCoverage } = require("v8");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  res.sendStatus(200);
  res.send(taskData);
});
// res.send('This is the tasks list')

//fetching a specific task id
taskRoutes.get("/:taskId", (req, res) => {
  // lets first check for the param  passed in the URL
  let taskIdPassed = req.params.taskId;

  // lets get tasks from the json
  let taskList = taskData.tasks;
  let result = taskList.filter((item) => taskIdPassed == item.taskId);

  res.send(result);
  // res.sendStatus(200);
});

//creating a new task
taskRoutes.post("/", (req, res) => {
  const taskDetails = req.body;
  let writePath = path.join(__dirname, "..", "tasks.json");

  //checking status in the validator response
  if (Validator.validTaskInfoPost(taskDetails, taskData).status) {
    let taskDataModified = taskData;
    taskDataModified.tasks.push(taskDetails);

    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {
      encoding: "utf8",
      flag: "w",
    });

    res.status(200).send("Task has been added successfully");
  } else {
    res.json(Validator.validTaskInfoPost(taskDetails, taskData));
  }
});

//updating  a task
taskRoutes.put("/:taskId", (req, res) => {
  let updateId = req.params.taskId;
  let updatedData = taskData;
  let updateTask = req.body;
  let writePath = path.join(__dirname, "..", "tasks.json");

  if (Validator.validateTaskInfoPut(updateTask, taskData).status) {
    let index = updatedData.tasks.findIndex((item) => item.taskId == updateId);
    updatedData.tasks[index] = updateTask;

    fs.writeFileSync(writePath, JSON.stringify(updatedData), {
      encoding: "utf8",
      flag: "w",
    });

    res.status(200).send("Task has been successfully updated");
  } else {
    res.send(Validator.validateTaskInfoPut(updateTask, taskData));
  }
});

module.exports = taskRoutes;
