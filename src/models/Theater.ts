import mongoose from 'mongoose'

//membuta genre skema

const theaterSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    }
}, { timestamps : true }) 

export default mongoose.model('Theater', theaterSchema, 'theaters')