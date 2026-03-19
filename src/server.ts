import express from "express";
import { loginHandler } from "./functions/authentication/login";
import { registerHandler } from "./functions/authentication/register";
import { logoutHandler } from "./functions/authentication/logout";
import { tasksHandler } from "./functions/flow-task/tasks";
import { addTaskHandler } from "./functions/flow-task/add-task";
import { updateTaskHandler } from "./functions/flow-task/update-task";
import { deleteTaskHandler } from "./functions/flow-task/delete-task";

const app = express();
const PORT = process.env.PORT || 8080;

app.post("/login", loginHandler);
app.post("/register", registerHandler);
app.post("/logout", logoutHandler);
app.get("/tasks", tasksHandler);
app.post("/addTask", addTaskHandler);
app.patch("/updateTask", updateTaskHandler);
app.delete("/deleteTask", deleteTaskHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Rutas disponibles:`);
  console.log(`  http://localhost:${PORT}/login`);
  console.log(`  http://localhost:${PORT}/register`);
  console.log(`  http://localhost:${PORT}/logout`);
  console.log(`  http://localhost:${PORT}/tasks`);
  console.log(`  http://localhost:${PORT}/addTask`);
  console.log(`  http://localhost:${PORT}/updateTask`);
  console.log(`  http://localhost:${PORT}/deleteTask`);
});
