import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, updateUserInfo } from '../../actions/userActions';
import Loader from '../Loader'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const About = () => {

    const dispatch = useDispatch()

    const [about, setAbout] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({
            "firstName": "",
            "lastName": "",
            "professionalTitle": "",
            "address": "",
            "birthday": "",
            "phone": "",
            "facebook": "",
            "instagram": "",
            "github": "",
            "linkedin": "",
            "gmail": "",
            "website": "",
            "about": about
        }))
        toast.dismiss()
        toast.success('About informations updated successfully', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'm-2'
        })
    }

    useEffect(() => {        
          if (error) {
            toast.dismiss()
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }
        
        if (!userProfile || !userProfile.name) {
            dispatch(getUserProfileDetails())
        } else {
            setAbout(userProfile.about)
        }
    }, [userInfo, dispatch, userProfile, error])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>About us</h2>
            </div>

            {loading && <div className='container my-5'><Loader /></div>}

            <div className='container card-body py-5' styles={{display: 'grid'}}>
                <form className='w-100 h-100' onSubmit={submitHandler}>
                    <textarea className="form-control" placeholder="Short and engaging pitch about yourself." style={{ height: '80%', resize: 'none', minHeight: '250px'}} value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

                    <div className='text-center'>
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>
            </div>

            <br />
        </div>
    )
}

export default About
