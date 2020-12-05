import express from 'express'
import colors from 'colors'
const app = express();
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import productsRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler } from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'

connectDB();

dotenv.config()

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use('/api/products', productsRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/orders/', orderRoutes)


//app.use(notFound());
//app.use(errorHandler());

app.get('/', (req, res) => {
    res.send('api is running');
})


app.listen(PORT, () => {
    console.log('Server running in ' + process.env.NODE_ENV + ' on port ' + PORT.yellow.bold)
})