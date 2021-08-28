import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Rating from '../Rating/Rating'
import Loader from '../Loader'
import Message from '../Message'
import { listProductDetails, createProductReview } from '../../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../../constants/productConstants';
import { Form } from '../../components/Signup/SignupElements'
import Swal from 'sweetalert2'
import ReactStars from "react-rating-stars-component";
import { updateCv } from '../../actions/userActions';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Detail = ({ id }) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { 
        error: errorProductReview, 
        loading: loadingProductReview, 
        success: successProductReview, 
    } = productReviewCreate

    useEffect(() => { 

        Aos.init({ duration: 2000 })

        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(id))

        if (error) {
            toast.dismiss()
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }

        if (errorProductReview) {
            toast.dismiss()
            toast.error(errorProductReview, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }

        if (successProductReview) {
            toast.dismiss()
            toast.success('Review Submitted', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }
        
    }, [dispatch, id, successProductReview, error, errorProductReview])

    const submitHandler = (e) => {
        e.preventDefault()
        
        if (rating === 0 || comment === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Rating and Comment are Required',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {
            dispatch(createProductReview(
                id, {
                    rating,
                    comment
                }
            ))
            setRating(0)
            setComment('')
        }
    }

    const cvUpdateHandler = () => {
        dispatch(updateCv(product.cv))
        toast.dismiss()
        toast.success('Updated successfully', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'm-2'
        })
    }

    return (
        <Container className='my-4'>
            <Link className='btn btn-light' style={{ borderRadius:'0' }} to='/templates'><small><small>GO BACK</small></small></Link>

            {
                loading
                    ? <Loader />
                    : (
                        <>
                            <Row className="row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 my-4">
                                <Col>
                                    <Image src={product.image} style={{ width: '100%', borderRadius: '5px' }} className='mb-3' />
                                </Col>

                                <Col>
                                    <strong>{product.name}</strong>
                                    <hr />

                                    <div className='d-flex'>
                                        <Rating 
                                            value={parseFloat(product.rating)}
                                            text={`(${product.numReviews} reviews)`}
                                        />
                                    </div>

                                    <hr />
                                    <small className='text-muted'>
                                        {product.description}
                                    </small>

                                    <br />
                                    <center className='m-4'>
                                        {userInfo ? (
                                            <Button className='btn btn-dark my-2' style={{ borderRadius:'0' }} onClick={cvUpdateHandler}>
                                                <small>
                                                    <i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;USE THIS CV
                                                </small>
                                            </Button>

                                        ) : (
                                            <Link className='btn btn-dark my-2' style={{ borderRadius:'0' }} to="/signin">
                                                <small>
                                                    <i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;USE THIS CV
                                                </small>
                                            </Link>
                                        )}
                                    </center>
                                </Col>
                            </Row>

                            <hr />

                            <div className="container my-5">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-8 col-lg-6">
                                        <div className="card shadow-0 border" style={{ backgroundColor: '#f0f2f5' }}>
                                            <div className="card-body pt-4 pb-0">
                                                
                                                {
                                                    userInfo
                                                        ? (
                                                            <center>
                                                                <div className="card mb-4" style={{ width: '100%'}} data-aos="zoom-in">
                                                                    <div className="card-body">
                                                                        <h6 className='mb-3'><strong>WRITE A REVIEW</strong></h6>
                                                
                                                                        <Form onSubmit={submitHandler}>
                                                                            <div className="star-container">
                                                                                <div className="star-widget" style={{ display: 'inline-block' }}>
                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        onChange={setRating}
                                                                                        size={32}
                                                                                        isHalf={false}
                                                                                        emptyIcon={<i className="far fa-star"></i>}
                                                                                        fullIcon={<i className="fa fa-star"></i>}
                                                                                        activeColor="#ffd700"
                                                                                        defaultValue={rating}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                    
                                                                            <div className="form-group mt-4">
                                                                                <TextField
                                                                                    id="commentInput"
                                                                                    label="Describe your experience."
                                                                                    multiline
                                                                                    rows={3}
                                                                                    variant="outlined"
                                                                                    style={{
                                                                                        width: "100%",
                                                                                        marginBottom: "25px"
                                                                                    }}
                                                                                    value={comment}
                                                                                    onChange={(e) => setComment(e.target.value)}
                                                                                />
                                                                            </div>
                                                        
                                                                            <div className="text-center mt-3">
                                                                                <button type="submit" id="submitReview" className="btn btn-sm" style={{ backgroundColor: '#FA9C23', color: '#fff', borderRadius: '25px'}}>
                                                                                    &#160;Submit&#160;
                                                                                </button>
                                                                            </div>
                                                                        </Form>

                                                                    </div>
                                                                </div>
                                                            </center>
                                                        )
                                                        : (
                                                            <div className="alert alert-danger text-center" role="alert">
                                                                Login to post your review.
                                                            </div>
                                                        )
                                                }
                                                
                                                { product.reviews.length === 0 &&<Message variant="info">No Reviews</Message> }
                                                { loadingProductReview && <div className="my-4"><Loader /></div> }
                                                
                                                { product.reviews.map((review) => (
                                                    <div key={review.id} className="card mb-4" data-aos="fade-up" data-aos-duration="1000">
                                                        <div className="card-body">
                                                            <p className='m-0 p-0 text-muted small' style={{ whiteSpace: 'pre-line' }}>{review.comment}</p>
                                                            
                                                            <center>
                                                                <hr className="m-0 p-0 my-3" style={{width: '100%', }} />
                                                            </center>

                                                            <div className="row">
                                                                <div className="col d-flex flex-row align-items-center">
                                                                    <i className="fa fa-user" aria-hidden="true"></i>&#160;
                                                                    <p className="small mb-0 mt-0 ms-2">{review.name}</p>
                                                                </div>
                                                                <div className="col">
                                                                    <div className='d-flex' style={{float: 'right'}}>
                                                                        <Rating 
                                                                            value={review.rating}
                                                                            text={`(${review.rating}/5)`}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </Container>
    )
}

export default Detail
