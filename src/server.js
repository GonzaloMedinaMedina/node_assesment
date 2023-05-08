import express from "express";
export const app = express();
import { clientsController } from "./Controllers/clientsController.js"
import { policiesController } from "./Controllers/policiesController.js" 

app.use("/clients", clientsController);
app.use("/policy", policiesController);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});