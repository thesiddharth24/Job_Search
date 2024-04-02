import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js'

const app = new express();
dotenv.config({path: './config/config.env'});
console.log('app');

app.use(cors({
    origin: '*',
    // origin: "https://job-search-2eqm.onrender.com",
    methods: ['GET' , 'POST' , 'DELETE' , 'PUT'],
    allowedHeaders: [
        'Content-Type',
      ]
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUpload({
    useTempFiles: true ,
    tempFileDir : '/tmp/'
}));

app.get('/',async (req,res)=>{
    res.send("Hello from siddharth Gupta");
});

app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter);

dbConnection();

app.use(errorMiddleware);

export default app;