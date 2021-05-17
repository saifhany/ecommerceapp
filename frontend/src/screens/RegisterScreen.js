import React , {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Button,Row,Col, Form ,} from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Message from '../components/Message';
import Loading from '../components/Loading';
import FormContainer from '../components/FormContainer';
import {register} from '../actions/userActions';
const RegisterScreen = ({location,history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading , error, userInfo} = userRegister
    const redirect = location.search ? location.search.split('=')[1]:'/'

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name,email,password ,phone ))
        }
    }
  return  <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        { loading &&<Loading />}
            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                <Form.Label>name </Form.Label>
                <Form.Control 
                type='name'
                 placeholder='Enter name'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email </Form.Label>
                <Form.Control 
                type='email'
                 placeholder='Enter email'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
             <Form.Group controlId='password'>
                <Form.Label>password </Form.Label>
                <Form.Control 
                type='password'
                 placeholder='Enter password'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 ></Form.Control>
             </Form.Group>
             <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm password </Form.Label>
                <Form.Control 
                type='password'
                 placeholder='Confirm password'
                 value={confirmPassword}
                 onChange={(e)=>setconfirmPassword(e.target.value)}
                 ></Form.Control>
             </Form.Group>
             <Form.Group controlId='phone'>
                <Form.Label>phone number </Form.Label>
                <Form.Control 
                type='phone'
                 placeholder='000-0000-0000'
                 value={phone}
                 onChange={(e)=>setPhone(e.target.value)}
                 ></Form.Control>
             </Form.Group>
             <Button type='submit' variant='primary'>
                 Register
             </Button>
            </Form>   
            <Row className='py-3'>
                <Col>
                   Have an Account?{' '}
                   <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sign in</Link> 
                </Col>
            </Row>    
    </FormContainer>

}

export default RegisterScreen
