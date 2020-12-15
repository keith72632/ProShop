import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { getOrderDetails, markAsDelivered } from '../actions/orderActions'

const OrderListDetailsScreen = ({history, match}) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch])

    const markDeliveredHandler = () => {
        window.confirm('Are you sure this order has been delivered?')
        dispatch(markAsDelivered(orderId))
        window.location.reload()
    }
    return (
        <>
         <h1>Products</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>Details</th>
                     </tr>
                 </thead>
                 <tbody>
                    <tr>Order Id: {order._id}</tr>
                    <tr>Customer Id: {order.user._id}</tr>
                    <tr>Total Price: {order.totalPrice}</tr>
                    <tr>Tax Price: {order.taxPrice}</tr>
                    <tr>Is Delivered? : {order.isDelivered ? <td>Yes</td> : <td>no</td>}</tr>
                    <tr>Date Paid : {order.paidAt ? order.paidAt.split('T')[0] : <td>Not Paid</td>}</tr>
                    <tr>Payment Method: {order.paymentMethod}</tr>
                    <tr>Shipping Address: {order.shippingAddress.address} {order.shippingAddress.city} {order.shippingAddress.postalCode} {order.shippingAddress.country}</tr>
                 </tbody>
             </Table>
         )}
         <Button onClick={markDeliveredHandler}>Click here to mark as delivered <i className="fas fa-check-square"></i></Button>
        </>
    )
}

export default OrderListDetailsScreen
