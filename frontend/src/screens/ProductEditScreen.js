import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    const [ brand, setBrand ] = useState('')
    const [ image, setImage ] = useState('')
    const [ upload, setUpload ] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProduct, error: errorProduct, product } = productDetails


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(!product._id || product._id !== productId) {
            dispatch(listProductDetails(productId))
        }
       
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(updateProduct(productId, {
            name,
            price,
            countInStock,
            description,
            brand,
            image,
        }))
        history.push('/admin/productlist')
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUpload(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUpload(false)
        } catch (error){
            console.error(error)
            setUpload(false)
        }
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit {product.name}</h1>
            <h1>ID: {product._id}</h1>
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
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type='number' placeholder='Enter Quantity' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />   
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setImage(e.target.value)} />
                    <Form.File id='image-file' label='Choose File' onChange={uploadFileHandler}></Form.File>   
                    {upload && <Loader/>}
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>description</Form.Label>
                    <br></br><textarea value={description} onChange={(e) => setDescription(e.target.value)} />   
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
