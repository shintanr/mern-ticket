import express from "express";
import genreRoutes from "./genreRoutes";
import theateroutes from "./theaterRoutes";
import movieRoutes from "./moviesRoutes";

const adminRoutes = express.Router();

adminRoutes.use(genreRoutes);
adminRoutes.use(theateroutes);
adminRoutes.use(movieRoutes);

export default adminRoutes;


