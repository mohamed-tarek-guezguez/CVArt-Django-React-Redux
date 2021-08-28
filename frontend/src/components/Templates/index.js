import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { 
    Form,
    Button,
    Input
} from './TemplatesElements'
import { Link, useHistory } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { listProducts } from '../../actions/productActions';
import Loader from '../Loader'
import Message from '../Message'

const TemplatesElements = () => {

    const [q, setQ] = useState('');
    const [p, setP] = useState(parseInt(localStorage.getItem('page')) || 1);

    const [input, setInput] = useState("");
    const [barOpened, ] = useState(true);
    const formRef = useRef();
    const inputFocus = useRef();

    let history = useHistory()

    const onFormSubmit = e => {
        e.preventDefault()
        setQ(input)
        setInput("")
        localStorage.setItem('page', 1)
        setP(1)
    }

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { 
        error, 
        loading, 
        products,
        num_pages,
        has_previous,
        has_next,
        page_rangeStart,
        page_rangeEnd,
        page,
    } = productList

    useEffect(() => {
        dispatch(listProducts(q, p))

        if (q !== '') {
            history.push(`/templates?keyword=${q}`)
        } else {
            history.push(history.push(history.location.pathname))
        }

        if (p) {
            localStorage.setItem('page', p)
        }
    }, [dispatch, q, p, history])


    var paginationResult = []
    for (let i = page_rangeStart; i < page_rangeEnd; i++) {
        paginationResult.push(i)
    }
    
    return (
        <Container className='my-5'>            
            <center>
                <Form
                    barOpened={barOpened}
                    onClick={() => {
                        inputFocus.current.focus();
                    }}
                    onSubmit={onFormSubmit}
                    ref={formRef}
                    className='mt-5'
                >
                    <Button type="submit" barOpened={barOpened}>
                        <Search />
                    </Button>
                    <Input
                        onChange={e => setInput(e.target.value)}
                        ref={inputFocus}
                        value={input}
                        barOpened={barOpened}
                        placeholder="Search"
                        name='q'
                    />
                </Form>
            </center> 

            {
                loading
                    ? <Loader />
                    : error 
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <>
                                { products.length === 0 && <div className='mt-5'><Message variant='danger'>No Results Found!</Message></div>}

                                <Row className="mt-5 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                                    {products.map(product => (
                                        <Col key={product.id} className='mb-3'>
                                            <Card className='p-3 rounded h-100'>
                                                <Link to={`/templates/${product.id}`}>
                                                    <Card.Img src={product.image} variant='top' className='h-100' style={{ height: '200px', borderRadius: '0px' }} />
                                                </Link>

                                                <Card.Body className='mb-0 pb-0'>
                                                    <Card.Text as='div'>
                                                        <div className='d-flex'>
                                                            <ReactStars
                                                                edit={false}
                                                                count={5}
                                                                size={24}
                                                                color={'#BDBDBD'}
                                                                activeColor="#ffd700"
                                                                isHalf={true}
                                                                emptyIcon={<i className="far fa-star"></i>}
                                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                fullIcon={<i className="fa fa-star"></i>}
                                                                value={parseFloat(product.rating)}
                                                            />
                                                            <small style={{ paddingTop: '10px' }}>
                                                                &nbsp;&nbsp;({product.numReviews} reviews)
                                                            </small>
                                                        </div>
                                                    </Card.Text>

                                                    <hr />

                                                    <Link to={`/templates/${product.id}`} className='text-dark' style={{ textDecoration: 'none' }}>
                                                        <Card.Title as='div'>
                                                            <strong>{product.name}</strong>
                                                        </Card.Title>
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                                { 
                                    num_pages > 1 && (
                                        <Pagination className='m-5 justify-content-center'>
                                            {has_previous && <Pagination.Prev onClick={() => setP(p-1)} />}
                                        
                                            {
                                                paginationResult.map((x) => (
                                                    page === x
                                                    ? <Pagination.Item key={x} active>{x}</Pagination.Item>
                                                    : <Pagination.Item key={x} onClick={() => setP(x)}>{x}</Pagination.Item>
                                                ))
                                            }

                                            {has_next && <Pagination.Next onClick={() => setP(p+1)} />}
                                        </Pagination>
                                    )
                                }
                            </>
                        )
            }

        </Container>
    )
}

export default TemplatesElements
