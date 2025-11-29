import mongoose from 'mongoose'

//membuta genre skema

const genreSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    }
}, { timestamps : true }) 

export default mongoose.model('Genre', genreSchema, 'genres')