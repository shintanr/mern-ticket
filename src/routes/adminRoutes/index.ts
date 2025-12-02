import express from "express";
import genreRoutes from "./genreRoutes";
import theateroutes from "./theaterRoutes";

const adminRoutes = express.Router();

adminRoutes.use(genreRoutes);
adminRoutes.use(theateroutes);


export default adminRoutes;


