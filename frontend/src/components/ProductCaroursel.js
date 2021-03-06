import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCaroursel = () => {

    const dispatch = useDispatch()

    const topProducts = useSelector(state => state.topProducts)
    const {error, loading, products } = topProducts

    useEffect(() => {
        dispatch(listTopProducts())    
    }, [dispatch])    
    return loading ? <Loader/> : error ? <Message variant='danger'/> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name}/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCaroursel