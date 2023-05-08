import express from "express";
export const policiesController = express.Router();

policiesController.get('/', (req, res) => {
  res.send('first policy endpoint');
});