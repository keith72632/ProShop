import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register, getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { createProduct } from '../actions/productActions'

const ProductCreateScreen = ({match, history}) => {
    const productId = match.params.id
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ countInStock, setCountInStock ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ image, setImage ] = useState('')
    const [ category, setCategory ] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProduct, error: errorProduct, product } = productDetails


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const productCreate = useSelector(state => state.productCreate)
    const { loading: createLoading, success: successLoading, error: createError, product: createProduct} = productCreate
    

    const createdProduct = {
        name,
        price,
        countInStock,
        description,
        image,
        brand,
        category,
        user
    }

    useEffect(() => {
        if(!userInfo.isAdmin) {
            history.push('/login')
        }
    }, [dispatch])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(createdProduct))
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Create Product</h1>
            {loading && <Loader/>}
            {error && <Message varaint='danger'>{error}</Message>}
            {createLoading && <Loader/>}
            {createError && <Message varaint='danger'>{error}</Message>}
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
                <Form.Group controlId='brand'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' placeholder='Enter Image' value={image} onChange={(e) => setImage(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Description</Form.Label>
                    <br></br><textarea type='file' placeholder='Enter Description' rows='5' value={description} onChange={(e) => setDescription(e.target.value)} />   
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

export default ProductCreateScreen
