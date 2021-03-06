import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productListReducer, productDetailsReducer, productDeleteReducer, productUpdateReducer, productCreateReducer, topProductsReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer,
userDeleteReducer, userAdminUpdateReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListAllReducer, orderDeliveredReducer } from './reducers/orderReducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderListAll: orderListAllReducer,
    orderDelivered: orderDeliveredReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userAdminUpdateReducer,
    topProducts: topProductsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAdressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAdressFromStorage },
    userLogin: { userInfo: userInfoFromStorage},

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
