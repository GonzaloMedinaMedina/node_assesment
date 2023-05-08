import express from "express";
import { registerClientsEndPoints } from "./Controllers/clientsController.js";
import { registerPoliciesEndPoints } from "./Controllers/policiesController.js";

const app = express();

registerClientsEndPoints(app);
registerPoliciesEndPoints(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});