# TaskManager-API

Creating tasks and updating status of the tasks.
// postman collection link: https://lunar-comet-232156.postman.co/workspace/TheBenininging~6c1e20fa-9068-47f6-9fb7-9fd61c312cc4/collection/18971417-6278bc6f-eb2f-4eb2-9cd9-e1e76dca5b6f?action=share&creator=18971417

## Description

This backend REST API is designed to view, create and  manage tasks, operations supported are GET,POST,PUT,DELETE

1. We can get the current list of tasks with GET /tasks
2. We can get a specific task with GET /tasks/:taskID
3. We can create a new task with POST /tasks body shall be of JSON which strictly contains title,descirption,taskID and complete as properties, title and description should not be empty and complete should either be true or false boolean value and the taskID must be unique and not already present.
4. We can update a specific task with GET/task/:taskID body shall be of JSON which strictly contains title,descirption and complete as properties, title and description should not be empty and complete should either be true or false boolean value taskID must not be unique and it should be already present.
5. We can delete a specific task with Delete /task/:taskId , the taskId should be already present

6. We will use an in-memory data store in the form of a JSON file to store tasks, operations supported()
7. The default port shall be 3001, as hardcoded in the app.js file.

### Dependencies

I have added express, body-parser and cors packages

### Executing program

Navigate to the project folder of the project and run the command "node src/app.js"


I used postman for validating the operations 
Thanks Pawan for such a clear and concise demo.

