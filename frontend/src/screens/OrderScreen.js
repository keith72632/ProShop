import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, markAsDelivered } from '../actions/orderActions'
import Message from '../components/Message'
import axios from 'axios'
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants'

const OrderScreen = ({match, location}) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady ] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay, error: paypalError } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    const orderDelivered = useSelector(state => state.orderDelivered)
    const { success: deliveredSuccess } = orderDelivered

    

    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100)/100).toFixed(2)
        }
    
        //Calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        const addPayPalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || deliveredSuccess) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }


        if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const markAsDeliveredHandler = () => {
        if(userInfo.isAdmin) {
            window.confirm('Are you sure this item has been delivered?')
            dispatch(markAsDelivered(orderId))
        }
    }
    
    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
    <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} 
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                            <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method:</h2>    
                            <p><strong>Method:</strong>
                            {order.paymentMethod}</p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                            <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>    
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your Order is Empty</Message> :
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}    
                            </ListGroup>}
                        </ListGroup.Item>
                    </ListGroup>    
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {paypalError && <Message varaint='danger'>Refresh Page If there is no PayPal button here</Message>}
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    {userInfo.isAdmin && !order.isDelivered && (
                        <LinkContainer to={'/admin/orderlist'}>
                            <Button onClick={markAsDeliveredHandler}>Mark As Delivered</Button>
                        </LinkContainer>
                )}
                </Col>
            </Row>   
    </>
}

export default OrderScreen
