import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProduct, listProducts, createProduct } from '../actions/productActions'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ match }) => {
    const dispatch = useDispatch()

    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList


    useEffect(() => {
        dispatch(listProducts('', pageNumber))
    }, [dispatch])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteProduct(id))
            window.location.reload(true)
        }
    }

    const createHandler = () => {
        dispatch(createProduct())
        window.location.reload(true)
        
    }

    return (
        <>
         <h1>Products</h1>
             <Button onClick={() => createHandler()}>Add Item</Button>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <>
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Price</th>
                         <th>Number in Stock</th>
                         <th>Date Created</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product => (
                         <tr key={product._id}>
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>{product.price}</td>
                             <td>{product.countInStock}</td>
                             <td>{product.dateCreated.split('T')[0]}</td>
                             <td>
                                 <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                     <Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                 </LinkContainer>
                                 <Button variant='red' className='btn-sm' onClick={()=> deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
             <Paginate pages={pages} page={page} isAdmin={true}/>
             </>
         )}
        </>
    )
}

export default ProductListScreen
