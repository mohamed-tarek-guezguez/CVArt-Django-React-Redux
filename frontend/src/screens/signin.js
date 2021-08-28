import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
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
} from '../components/Signin/SigninElements'
import img from '../images/login2.svg'
import AuthNav from '../components/AuthNav'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const SigninPage = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/templates'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
    }, [history, userInfo, redirect, error])

    return (
        <>
            <AuthNav Title='Register' link='/signup'/>

            {loading && <div className='container my-5'><Loader /></div>}
            
            <FormWrap>
                <Row>                        
                    <Column1 data-aos="fade-up" data-aos-duration="2000">
                        <Form onSubmit={submitHandler}>
                            <Title>Welcome Back!</Title>
                            <SubTitle>Login to continue</SubTitle>
                            <Input 
                                type='email' 
                                placeholder='Enter email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                type='password' 
                                placeholder='Enter password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <FormButton type='submit'>Login</FormButton>
                            <SignUpLbl>Don't have an account?</SignUpLbl>
                            <SignUpLink to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                                Register
                            </SignUpLink>
                        </Form>
                    </Column1>

                    <Column2 data-aos="fade-down" data-aos-duration="2000">
                        <Image src={img} alt='login'/>
                    </Column2>
                </Row>
            </FormWrap>

            <Footer />
        </>
    )
}

export default SigninPage
