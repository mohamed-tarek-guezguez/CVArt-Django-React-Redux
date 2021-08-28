import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TempNav from '../components/TempNav'
import Footer from '../components/Footer'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader'
import { Form } from '../components/Signup/SignupElements'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Profile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const [passDisabled, setPassDisabled] = useState(true)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()

        if (oldPassword !== newPassword) {
            setMessage('Passwords do not match')
        } else if ((passDisabled === false) & (oldPassword.length < 6)) {
            setMessage('Passwords must be at least 6 characters')
        } else {
            if (/[^0-9a-z]/.test(name)) {
                setMessage('User Name must be lowercase alphanumeric!')
            } else {
                dispatch(updateUserProfile({
                    'id': user.id,
                    'name': name,
                    'email': email,
                    'password': newPassword,
                }))
                setMessage('')
                toast.dismiss()
                toast.success('Profile informations updated successfully', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'm-2'
                })
            }
        }
    }

    const enablePasswordUpdate = () => {
        setPassDisabled(false)
        setMessage('you can now update your password')
    }

    useEffect(() => {        
        if (!userInfo) {
            history.push('/signin')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
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
    }, [dispatch, history, userInfo, user, success, error, message])

    return (
        <>
            <TempNav />
            {loading && <div className='container my-5'><Loader /></div>}

            <div className='d-flex align-items-center justify-content-center' style={{minHeight: '75vh'}}>
                <div style={{ display: 'grid', width: '350px'}}>
                    <Form onSubmit={submitHandler}>
                        <fieldset className="border p-3 py-4">
                            <legend className="w-auto">Update Profile</legend>
                            <TextField 
                                required
                                label="Username" 
                                type="text" 
                                variant="outlined" 
                                className='mb-4 w-100' 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField 
                                required
                                label="Email" 
                                type="email" 
                                variant="outlined" 
                                className='mb-4 w-100' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                disabled={passDisabled}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className='mb-4 w-100' 
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <TextField
                                disabled={passDisabled}
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className='mb-3 w-100' 
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <small className="text-muted">
                                To change your password&nbsp;
                                <span 
                                    className="text-info" 
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={enablePasswordUpdate}
                                >
                                    click here.
                                </span>
                            </small>
                            <div className='text-center mt-4'>
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                            </div>
                        </fieldset>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile
