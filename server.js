const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
const { default: mongoose } = require('mongoose');

app.use('/', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error', err.message));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});