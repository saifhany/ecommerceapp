import { createStore, combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer ,productTopRatedReducer,productReviewCreateReducer ,productUpdateReducer ,productCreateReducer , productDeleteReducer , productDetailsReducer } from './reducers/productReducers';
import { cartReducer} from './reducers/cartReducers';
import {userLoginReducer ,userUpdateReducer ,userDeleteReducer ,userRegisterReducer ,userListReducer, userDetailsReducer ,userUpdateProfileReducer} from './reducers/userReducers';
import {orderCreateReducer ,orderDeliverReducer ,orderDetailsReducer ,orderListMyReducer ,orderPayReducer ,orderListReducer } from './reducers/orderReducrs';
const reducer = combineReducers({
     productList : productListReducer,
    productDetails  : productDetailsReducer,
      cart :cartReducer,
      userLogin:userLoginReducer,
      userRegister:userRegisterReducer,
      userDetails :userDetailsReducer,
       userUpdateProfile :userUpdateProfileReducer,
       orderCreate:orderCreateReducer,
       orderDetails:orderDetailsReducer,
        orderPay:orderPayReducer,
        orderListMy:orderListMyReducer,
        userList:userListReducer,
        userDelete:userDeleteReducer,
        productDelete:productDeleteReducer,
        userUpdate:userUpdateReducer,
        productCreate: productCreateReducer,
        productUpdate:productUpdateReducer,
        orderList:orderListReducer,
        orderDeliver:orderDeliverReducer,
        productReviewCreate:productReviewCreateReducer,
        productTopRated:productTopRatedReducer
 })
const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
:[]

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
:null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress'))
:{}

const initialState = {
    cart: { cartItems : cartItemsFromStorage ,
         shippingAddress:shippingAddressFromStorage 
        }
         ,
    userLogin:{userInfo:userInfoFromStorage},
}

const Middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...Middleware))
    )
    export default store