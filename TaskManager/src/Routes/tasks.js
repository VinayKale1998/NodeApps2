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

//----------------------GET Whole List-------------------------

taskRoutes.get("/", (req, res) => {
  res.status(200).send(taskData);
});



//----------------------GET specific task------------------------
taskRoutes.get("/:taskId", (req, res) => {
  //fetching  the param  passed in the endpoint
  let taskIdPassed = req.params.taskId;
  let taskList = taskData.tasks;
  let result = taskList.filter((item) => taskIdPassed == item.taskId);

  if (result.length == 0) {
    res.status(200).json({ status: false, message: "Task not found" });
  } else {
    res.send(result);
  }
});




//--------------------POST  create a new task-------------------
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



//-----------------------PUT updating an existing task--------------------
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
    res.json(Validator.validateTaskInfoPut(updateTask, taskData));
  }
});




//---------------------Delete , remove an exisiting task---------------------
taskRoutes.delete("/:taskId", (req, res) => {
  let deleteId = req.params.taskId;
  let updatedTasks = taskData;
  let writePath = path.join(__dirname, "..", "tasks.json");

  if (Validator.alreadyPresent(deleteId, taskData)) {
    updatedTasks.tasks = taskData.tasks.filter((item) => {
      return item.taskId != deleteId;
    });
    fs.writeFileSync(writePath, JSON.stringify(updatedTasks), {
      encoding: "utf8",
      flag: "w",
    });
    res.status(200).send("Task has been successfully deleted");
  } else {
    res.json({ status: false, message: "TaskId not found" });
  }
});

module.exports = taskRoutes;
