import express from 'express'
import colors from 'colors'
const app = express();
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'
import productsRoutes from './routes/productRoutes.js'

connectDB();

dotenv.config()

const PORT = process.env.PORT || 5000;

//middleware
app.use('/api/products', productsRoutes)

app.get('/', (req, res) => {
    res.send('api is running');
})


app.listen(PORT, () => {
    console.log('Server running in ' + process.env.NODE_ENV + ' on port ' + PORT.yellow.bold)
})