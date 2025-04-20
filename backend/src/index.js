import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config/server-config.js';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js'

const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(cors());

//database connection
connectDB();

//routes
app.use("/api",apiRoutes);



app.get('/', (req, res) => {
    res.send('Complaint Management System Backend');
});


const setup_and_start_server=()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();