import Movie from "../models/Movie"
import { Request, Response } from "express"
import { movieSchema } from "../utils/zodSchema"


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

export const createMovie = async (req: Request, res: Response) => { 
    try {
        if (!req.file) {
            return res.status(400).json ({
                data: null,
                message: "Thumbnail is required",
                status: 'failed'
            })
        }
        
        // use zod to validate req.body
        const parse = movieSchema.safeParse ({
            title: req.body.title,
            genre: req.body.genre,
            theaters: req.body.theaters.split(','),
            available: req.body.available === '1' ? true : false, // karena dari form data itu bertipe string
            description: req.body.description,
            price: Number.parseInt(req.body.price),
            bonus: req.body?.bonus, // optional
        })

        if( !parse.success) {
            const errorMessages = parse.error.issues.map((err) => err.message)

            return res.status(400).json ({
                message: "Invalid request data",
                details: errorMessages,
                status: 'failed'
            })
        }
          
        const movie = new Movie ({
            title: parse.data.title,
            genre: parse.data.genre,
            theaters: parse.data.theater,
            available: parse.data.available,
            thumbnail: req.file?.filename,
            description: parse.data.description,
            price: parse.data.price,
            bonus: parse.data.bonus,

        })

        await movie.save()

        return res.status(201).json ({
            data: movie,
            message: "Movie created successfully",
            status: 'success'
        })

    } catch (error) {
        console.error("Failed to created data", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to created data",
            status: 'failed'
        })
    }
}