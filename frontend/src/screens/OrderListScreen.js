import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listAllOrders } from '../actions/orderActions'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderListAll = useSelector(state => state.orderListAll)
    const { loading, error, orders } = orderListAll


    useEffect(() => {
        dispatch(listAllOrders())
    }, [dispatch])


    return (
        <>
         <h1>Products</h1>
             <Button>Add Item</Button>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Customer</th>
                         <th>Price</th>
                         <th>Date Paid</th>
                         <th>Delivered</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order => (
                         <tr key={order._id}>
                             <td>{order._id}</td>
                             <td>{order.user.name}</td>
                             <td>{order.totalPrice}</td>
                             <td>{order.paidAt.split('T')[0]}</td>
                             <td>{order.isDelivered ? (<i className='fas fa-times' style={{'color': 'green'}}></i>) :
                             <i className='fas fa-times' style={{'color': 'red'}}></i>}</td>
                             <td>
                                 <LinkContainer to={`/orders/${order._id}`}>
                                     <Button variant='light' className='btn-sm'><i className='fas fa-info-circle'></i></Button>
                                 </LinkContainer>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
         )}
        </>
    )
}

export default OrderListScreen
