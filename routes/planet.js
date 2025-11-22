const express = require("express");
const { getAllPlanets, addNewPlanet, updateNewPlanet, deletePlanet } = require("../controller/planet");

const planetRouter = express.Router()

exports.planetRouter = planetRouter
.get("/",getAllPlanets)
.post("/",addNewPlanet)
.patch("/:id",updateNewPlanet)
.delete("/:id",deletePlanet)