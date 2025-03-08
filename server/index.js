import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/db.connection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import adminProductsRouter from './routes/admin.routes.js';
import shopRouter from './routes/shop.routes.js'


const app = express();
dotenv.config();
dbConnection();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/shop',shopRouter);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});