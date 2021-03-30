import React ,{useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {Button , Form ,Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckOutSteps';
import {savePaymentMethod} from '../actions/cartActions';   
const PaymentScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }
    const [PaymentMethod,setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        history.push('/placeorder')
}
    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3 />
            <h1> Payment Method</h1>
            <Form onSubmit={submitHandler}>
               <Form.Group>
                   <Form.Label as='legend'>select Method</Form.Label>
               </Form.Group>
               <Col>
                   <Form.Check type='radio'
                    label='Paypal or Credit Card'
                     id='Paypal'
                      name='paymentMethod'
                       value='Paypal'
                        checked
                         onChange={(e)=> setPaymentMethod(e.target.value)}
                         ></Form.Check>
                 {/* <Form.Check 
                 type='radio'
                    label='Stripe'
                     id='Stripe'
                      name='paymentMethod'
                       value='Stripe'
                        checked
                         onChange={(e)=> setPaymentMethod(e.target.value)}
                         ></Form.Check> */}
               </Col>
                <Button type='sumbit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
