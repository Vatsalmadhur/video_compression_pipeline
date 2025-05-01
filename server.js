const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/connectDB');
const videoRoutes = require('./routes/videoRoutes');
app.use(cors());
app.use(express.json());

const dbconnection = async () => {
    try{
        await connectDB().then(() => {
            console.log('Database connected');

        })
    }
    catch (error) {
        console.error('Database connection error:', error);

    }
};
dbconnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.use('/videos', videoRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}
);
