import Movie from "../models/Movie"
import { Request, Response } from "express"
import { movieSchema } from "../utils/zodSchema"
import path from "node:path"
import fs from "node:fs"
import Genre from "../models/Genre"
import Theater from "../models/Theater"


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
            theaters: parse.data.theaters,
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

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params 

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


        const oldMovie = await Movie.findById(id)

        if (!oldMovie) {
            return res.status(404).json ({
                data: null,
                message: "Movie not found",
                status: 'failed'
            })
        }

        if (req.file) {
            const dirname = path.resolve()
            const filepath = path.join (dirname, "public/uploads/thumbnails",oldMovie.thumbnail)
            
            if( fs.existsSync(filepath)) {
            fs.unlinkSync (filepath)
          }
        }

        await Genre.findByIdAndUpdate(oldMovie.genre, {
                $pull: {
                 movies: oldMovie._id
             }
     })  
        
         for(const theater of oldMovie.theaters) {
            await Theater.findByIdAndUpdate(theater._id, {
                 $pull: {
                     movies: theater._id 
                 }
           })
        }

        await Movie.findByIdAndUpdate(oldMovie._id, {
             title: parse.data.title,
            genre: parse.data.genre,
            theaters: parse.data.theaters,
            available: parse.data.available,
            thumbnail: req?.file ? req.file.filename : oldMovie.thumbnail, // jika tidak mengupdate thumbnail, pakai thumbnail lama
            description: parse.data.description,
            price: parse.data.price,
            bonus: parse.data.bonus,
        })

        await Genre.findByIdAndUpdate(parse.data.genre, {
            $push: {
                movies: id
         }
        })  
        
         for(const theater of parse.data.theaters) {
            await Theater.findByIdAndUpdate(theater, {
                $push: {
                movies: id
                 }
           })
        }       
        
        
        const updatedMovie = await Movie.findById(id)

        return res.json ({
            data: updatedMovie,
            message: "Movie updated successfully",
            status: 'success'
        })
            

    } catch (error) {
        console.error("Failed to updated data", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to updated data",
            status: 'failed'
        })
    }
}