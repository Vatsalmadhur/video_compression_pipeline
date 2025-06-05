const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db/connectDB');
const videoRoutes = require('./routes/videoRoutes');
app.use(cors({origin:process.env.FRONTEND_URL}));
console.log(process.env.FRONTEND_URL)
app.use(express.json());
const port = process.env.PORT;
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.use('/videos', videoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);
