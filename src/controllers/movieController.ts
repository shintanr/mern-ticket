import Movie from "../models/Movie"
import { Request, Response } from "express"


export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find().populate({
            path: 'genre',
            select: 'name'
        }).populate({
            path: 'theaters',
            select: 'name city'
        })

        return res.json ({
            data: movies,
            message: "Movies retrieved successfully",
            status: 'success'
        })

    } catch (error) {
        console.error("Error retrieving movies:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to retrieve movies",
            status: 'failed'
        })
    }
} 