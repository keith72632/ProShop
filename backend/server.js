import express from 'express'
import colors from 'colors'
const app = express();
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

connectDB();

dotenv.config()

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('api is running');
})


app.get('/api/products', (req, res) => {
    res.send(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.status(200).send(product);
})

app.listen(PORT, () => {
    console.log('Server running in ' + process.env.NODE_ENV + ' on port ' + PORT.yellow.bold)
})