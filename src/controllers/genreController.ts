import type { Request, Response } from "express"
import Genre from "../models/Genre"
import { genreSchema } from "../utils/zodSchema"

export const getGenres = async (req: Request, res: Response) => {
    try {const genres = await Genre.find()
        return res.json ({
            data: genres,
            message: "Genres retrieved successfully",
            status: 'success'
        })
    } catch (error) {
        console.error("Error retrieving genres:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to retrieve genres",
            status: 'failed'
        })
    }
}

export const getGenreDetailById = async (req: Request, res: Response) => {
    try {
        
        const {id} = req.params

        const genre = await Genre.findById(id)
       
        return res.json ({
            data: genre,
            message: "Genre detail retrieved successfully",
            status: 'success'
        })
    } catch (error) {
        console.error("Error retrieving genre's detail:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to retrieve genre's detail",
            status: 'failed'
        })
    }
}


export const postGenre = async (req: Request, res: Response) => {
    try {
        const body = genreSchema.parse(req.body)

        const genre = new Genre({
            name: body.name
        })

        const newData = await genre.save()

        return res.json({
            messege: 'success create data',
            data: newData,
            status: 'success'
        })
        
    } catch (error) {
        console.error("Error retrieving genres:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to create data",
            status: 'failed'
        })
    }
}

export const putGenre = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const body = genreSchema.parse(req.body)

        await Genre.findByIdAndUpdate(id, {
            name: body.name
        })

        const updatedData = await Genre.findById(id)

        return res.json({
            messege: 'success update data',
            data: updatedData,
            status: 'success'
        })
        
    } catch (error) {
        console.error("Error retrieving genres:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to update data",
            status: 'failed'
        })
    }
}


export const deleteGenre = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const deletedData = await Genre.findById(id)

        await Genre.findByIdAndDelete(id)
       

        return res.json({
            messege: 'success delete data',
            data: deletedData,
            status: 'success'
        })
        
    } catch (error) {
        console.error("Error retrieving genres:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to delete data",
            status: 'failed'
        })
    }
}



