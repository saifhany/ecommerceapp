import React ,{useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {Row , Col} from 'react-bootstrap';
import  Product from '../components/product';
import Message from '../components/Message';
import Loading from '../components/Loading';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/productcarousel';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword= match.params.keyword
  // eslint-disable-next-line
  const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();
    const productList = useSelector( (state) => state.productList)
    const { loading , error , products ,page ,pages } = productList

  useEffect(() => {
  dispatch(listProducts(keyword,pageNumber)) 
  },[dispatch ,keyword ,pageNumber])
  return (
    <>
    <Meta />
    {!keyword && <ProductCarousel /> } 
      <h1>Latest Products</h1>
      { loading ? (
        <Loading />
        )
       : error ? ( 
         <Message variant='danger'>{error}</Message> 
         ) 
       : (
         <> 
         <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </>
      )   
      }
 
    </>
  )
}

export default HomeScreen