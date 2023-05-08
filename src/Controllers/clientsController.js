import express from "express";
export const clientsController = express.Router();

clientsController.get('/', (req, res) => {
  res.send('first client endpoint');
});