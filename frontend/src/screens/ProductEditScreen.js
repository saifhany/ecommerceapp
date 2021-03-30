import axios from 'axios';
import React , {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import {useDispatch , useSelector} from 'react-redux';
import Message from '../components/Message';
import Loading from '../components/Loading';
import FormContainer from '../components/FormContainer';
import {listProductDetails ,updateProduct } from '../actions/productActions';
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants';
const ProductEditScreen = ({match,history}) => {
    const productId = match.params.id
    const [name , setName] = useState('')
    const [price , setPirce] = useState(0)
    const [image , setImage] = useState('')
    const [brand , setBrand] = useState('')
    const [category , setCategory] = useState('')
    const [countInStock , setCountInStock ] = useState(0)
    const [description , setDescription ] = useState('')
    const [uploading , setUploading ] = useState(false)
    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading , error, product } = productDetails
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:loadingUpdate , error:errorUpdate, success:successUpdate } = productUpdate

    useEffect(() => {
      if(successUpdate){
          dispatch({type:PRODUCT_UPDATE_RESET})
          history.push('/admin/productlist')
      } else{
          if(!product.name || product._id !==productId){
              dispatch(listProductDetails(productId))
          }else{
              setName(product.name)
              setPirce(product.price)
              setCategory(product.category)
              setImage(product.image)
              setBrand(product.brand)
              setCountInStock(product.countInStock)
              setDescription(product.description)
          }
      }
    },[dispatch ,product , history ,productId ,successUpdate ])
   const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                },
            }
            const {data} = await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch(error){
         console.error(error)
         setUploading(false)
        }
   }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            category,
            image,
            brand,
            countInStock,
            description
        }))
    }

  return (
  <>
  <Link to='/admin/productlist' className='btn btn-light my-3'> 
  Go Back
  </Link>
  <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loading / >}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ?<Loading/> : error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                <Form.Label>Name </Form.Label>
                <Form.Control 
                type='name'
                 placeholder='Enter name'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='price'>
                <Form.Label>price </Form.Label>
                <Form.Control 
                type='text'
                 placeholder='Enter Price'
                 value={price}
                 onChange={(e)=>setPirce(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='brand'>
                <Form.Label>brand </Form.Label>
                <Form.Control 
                type='text'
                 placeholder='Enter Prand'
                 value={brand}
                 onChange={(e)=>setBrand(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>image </Form.Label>
                <Form.Control 
                type='image'
                 placeholder='Enter image'
                 value={image}
                 onChange={(e)=>setImage(e.target.value)}
                 >
                 </Form.Control>
                 <Form.File 
                 id='image-file'
                  label='Choose File'
                   custom
                    onChange={uploadFileHandler}
                     ></Form.File>
                     {uploading && <Loading />}
             </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>Category </Form.Label>
                <Form.Control 
                type='text'
                 placeholder='Enter category'
                 value={category}
                 onChange={(e)=>setCategory(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='countInStock'>
                <Form.Label>countInStock </Form.Label>
                <Form.Control 
                type='number'
                 placeholder='Enter countInStock'
                 value={countInStock}
                 onChange={(e)=>setCountInStock(e.target.value)}
                 >
                 </Form.Control>
             </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>description </Form.Label>
                <Form.Control 
                type='text'
                 placeholder='Enter description'
                 value={description}
                 onChange={(e)=>setDescription(e.target.value)}
                 >
                 </Form.Control>
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
