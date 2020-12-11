import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register, getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'
import { listProductDetails, updateProduct } from '../actions/productActions'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ countInStock, setCountInStock ] = useState('')
    const [ description, setDescription ] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProduct, error: errorProduct, product } = productDetails


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(product) {
            setName(product.name)
            setPrice(product.price)
        } else {
            dispatch(listProductDetails(productId))
        }
    }, [dispatch, setName, setPrice])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(updateProduct(productId, {
            name,
            price,
            countInStock
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit {product.name} {product._id}</h1>
            {loading && <Loader/>}
            {error && <Message varaint='danger'>{error}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Quantity' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />   
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
            </FormContainer>
        </>
        
    )
}

export default ProductEditScreen
