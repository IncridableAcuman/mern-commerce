const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport=require('passport');
require('dotenv').config();
const db=require('./configs/db');
const authRoutes=require('./routes/auth.routes');
const projectRoutes = require('./routes/product.route');
const errorMiddleware=require('./middlewares/error.middleware');
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(passport.initialize());
app.use('/api/auth',authRoutes);
app.use('/api/projects',projectRoutes);

app.use(errorMiddleware);
const port=process.env.PORT || 5000;

db();
app.listen(port,()=>{
    console.log(`Server is running on ${port} port...`);
})