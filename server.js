require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connectado'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use(cors());

app.use(userRouter);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
