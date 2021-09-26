import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { 
    Column1,
    Column2,
    FormWrap,
    Form,
    Row,
    Image,
    Title,
    SubTitle,
    Input,
    FormButton,
    SignUpLbl,
    SignUpLink,
} from '../components/Signup/SignupElements'
import img from '../images/register.svg'
import AuthNav from '../components/AuthNav'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const SignupPage = ({location, history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/templates'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading} = userRegister

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else if (password.length < 6) {
            setMessage('Passwords must be at least 6 characters')
        } else {
            dispatch(register(name, email, password))
        }
    }

    useEffect(() => {
        Aos.init({ duration: 2000 })
        
        if (userInfo) {
            history.push(redirect)
        }

        if (error) {
            toast.dismiss()
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }

        if (message) {
            toast.dismiss()
            toast.warn(message, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
            setMessage('')
        }
    }, [history, userInfo, redirect, error, message])

    return (
        <>
            <AuthNav Title='Login' link='/signin'/>

            {loading && <div className='container my-5'><Loader /></div>}
            
            <FormWrap>
                <Row>
                    <Column1 data-aos="fade-down" data-aos-duration="2000">
                        <Form onSubmit={submitHandler}>
                            <Title>Register Here!</Title>
                            <SubTitle>Join us today</SubTitle>
                            <Input 
                                type='text' 
                                placeholder='Username'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Input 
                                type='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input 
                                type='password' 
                                placeholder='Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Input 
                                type='password' 
                                placeholder='Confirm Password' 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <FormButton type='submit'>Register</FormButton>
                            <SignUpLbl>Already have an account?</SignUpLbl>
                            <SignUpLink to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
                                Login
                            </SignUpLink>
                        </Form>
                    </Column1>

                    <Column2 data-aos="fade-up" data-aos-duration="2000">
                        <Image src={img} alt='login'/>
                    </Column2>
                </Row>
            </FormWrap>

            <Footer />
        </>
    )
}

export default SignupPage
