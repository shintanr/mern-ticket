import express from 'express';
import { deleteTheater, getTheaterDetailById, getTheaters, postTheater, putTheater } from '../../controllers/theaterController';
import { validateRequest } from '../../middlewares/validateRequest';
import { theaterSchema } from '../../utils/zodSchema';

const theateRoutes = express.Router();

theateRoutes.get('/theaters', getTheaters)
theateRoutes.get('/theaters/:id', getTheaterDetailById)
theateRoutes.post('/theaters', validateRequest(theaterSchema), postTheater)
theateRoutes.put('/theaters/:id', validateRequest(theaterSchema), putTheater)
theateRoutes.delete('/theaters/:id', deleteTheater)


export default theateRoutes