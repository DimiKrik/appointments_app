import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import servicesRoute from './routes/services.js';
import appointmentRoute from './routes/appointments.js';
import toolRoute from './routes/tools.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();


dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Online');
  } catch (error) {
    throw error;
  }
};


app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());

app.use('/api/services', servicesRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/tools', toolRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'something went wrong!';
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connected to server!');
});
