// const { default: isBoolean } = require("validator/lib/isBoolean")

class Validator {
  static validTaskInfoPost(taskInfo, taskData) {
    //post --------------------------------------------------
    if (
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("complete") &&
      this.validateUniqueTaskId(taskInfo, taskData)
    ) {
      //valiating presence of important properties

      //    validating title
      if (!taskInfo.title.length > 0) {
        return {
          "status": false,
          "message": "Title cannot be empty",
        };
      }

      if (!taskInfo.description.length > 0) {
        return {
          "status": false,
          "message": "Desc cannot be empty",
        };
      }

      //validating completion status
      if (typeof taskInfo.complete !== "boolean") {
        return {
          "status": false,
          "message": "Completion status can only be either true or false",
        };
      }

      return {
        "status": true,
        "message": "Task has been added",
      };


    } 
    
    else if (!this.validateUniqueTaskId(taskInfo, taskData)) {
      return {
        "status": false,
        "message": "Task Id should be unique",
      };
    } else if (
      !taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("complete")
    ) {
      return {
        "status": false,
        "message": "Data provided is malformed, please enter all the details",
      };
    }
  
  }

  //put----------------------------------

  static validateTaskInfoPut(taskInfo, taskData) {
    if (
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("complete") &&
      this.alreadyPresent(taskInfo, taskData)
    ) {
      //valiating presence of important properties

      //    validating title
      if (!taskInfo.title.length > 0) {
        return {
          "status": false,
          "message": "Title cannot be empty",
        };
      }

      if (!taskInfo.description.length > 0) {
        return {
          "status": false,
          "message": "Desc cannot be empty",
        };
      }

      //validating completion status
      if (typeof taskInfo.complete !== "boolean") {
        return {
          "status": false,
          "message": "Completion status can only be either true or false",
        };
      }

      return {
        "status": true,
        "message": "Task has been added",
      };

    } 
    
    else if (!this.alreadyPresent(taskInfo, taskData)) {
      return {
        "status": false,
        "message": "Task with the provided task Id not present",
      };
    } else if (
      !taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("complete")
    ) {
      return {
        "status": false,
        "message": "Data provided is malformed, please enter all the details",
      };
    }

   
  }

  static validateUniqueTaskId(taskInfo, taskData) {
    let valueFound = taskData.tasks.some(
      (value) => value.taskId == taskInfo.taskId
    );

    if (valueFound) return false;

    //else
    return true;
  }

  static alreadyPresent(taskInfo, taskData) {
    let present = taskData.tasks.some((item) => item.taskId == taskInfo.taskId);

    if (present) return false;

    return true;
  }
}

module.exports = Validator;
