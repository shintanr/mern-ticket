import { Request, Response } from 'express'
import Theater from '../models/Theater';
import { theaterSchema } from '../utils/zodSchema';

export const getTheaters = async (req: Request, res: Response) => {
    try {const theaters = await Theater.find()
        return res.json ({
            data: theaters,
            message: "Theaters retrieved successfully",
            status: 'success'
        })
    } catch (error) {
        console.error("Error retrieving theaters:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to retrieve theaters",
            status: 'failed'
        })
    }
}


export const getTheaterDetailById = async (req: Request, res: Response) => {
    try {
        
        const {id} = req.params

        const theater = await Theater.findById(id)
       
        return res.json ({
            data: theater,
            message: "Theater detail retrieved successfully",
            status: 'success'
        })
    } catch (error) {
        console.error("Error retrieving theater's detail:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to retrieve theater's detail",
            status: 'failed'
        })
    }
}


export const postTheater = async (req: Request, res: Response) => {
    try {
        const body = theaterSchema.parse(req.body)

        const theater = new Theater({
            name: body.name,
            city: body.city
        })

        const newData = await theater.save()

        return res.json({
            messege: 'success create data',
            data: newData,
            status: 'success'
        })
        
    } catch (error) {
        console.error("Error retrieving theaters:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to create data",
            status: 'failed'
        })
    }
}



export const putTheater = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const body = theaterSchema.parse(req.body)

        await Theater.findByIdAndUpdate(id, {
            name: body.name,
            city: body.city
        })

        const updatedData = await Theater.findById(id)

        return res.json({
            messege: 'success update theater data ',
            data: updatedData,
            status: 'success'
        })
        
    } catch (error) {
        console.error("Error retrieving theater:", error);
        return res.status(500).json ({
            data: null,
            message: "Failed to update data",
            status: 'failed'
        })
    }
}


export const deleteTheater = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const deletedData = await Theater.findById(id)

        await Theater.findByIdAndDelete(id)
       

        return res.json({
            messege: 'success delete theater data',
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