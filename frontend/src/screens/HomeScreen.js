import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

}, [dispatch, keyword])

    return (
        <>
            <h1>Welcome to Auction House</h1>
            <h2>Latest Products</h2>
            {loading ? <h2>...loading</h2> : error ? <Message variant='danger '>{error}</Message>: ( 
            <>
            <Row>
                {products.map((product) => (
                    <Col key={product._id}sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
            </>
            )}
        </>
    )
}

export default HomeScreen
