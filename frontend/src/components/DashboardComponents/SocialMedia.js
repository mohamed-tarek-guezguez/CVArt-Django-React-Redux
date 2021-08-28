import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, updateUserInfo } from '../../actions/userActions';
import Loader from '../Loader'
import {PROFILE_DETAILS_RESET} from '../../constants/userConstants';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const SocialMedia = () => {

    const dispatch = useDispatch()

    const [selectInput, setSelectInput] = useState('Facebook')
    const [txtInput, setTxtInput] = useState('')

    const [facebook, setFacebook] = useState('https://www.facebook.com/')
    const [instagram, setInstagram] = useState('https://www.instagram.com/')
    const [github, setGithub] = useState('https://github.com/')
    const [linkedin, setLinkedin] = useState('https://www.linkedin.com/')
    const [gmail, setGmail] = useState('https://www.gmail.com/')
    const [website, setWebsite] = useState('https://example.com/')

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails
    
    const userInfoUpdate = useSelector(state => state.userInfoUpdate)
    const { success: userInfoUpdateSuccess } = userInfoUpdate

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUserInfo({
            "firstName": "",
            "lastName": "",
            "professionalTitle": "",
            "address": "",
            "birthday": "",
            "phone": "",
            "facebook": selectInput === 'Facebook' ? txtInput : '',
            "instagram": selectInput === 'Instagram' ? txtInput : '',
            "github": selectInput === 'Github' ? txtInput : '',
            "linkedin": selectInput === 'Linkedin' ? txtInput : '',
            "gmail": selectInput === 'Gmail' ? txtInput : '',
            "website": selectInput === 'Website' ? txtInput : '',
            "about": ""
        }))
        dispatch({ type: PROFILE_DETAILS_RESET })
        setTxtInput('')
        setSelectInput('Facebook')
        toast.dismiss()
        toast.success('Social Media informations updated successfully', {
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
            setFacebook(userProfile.facebook)
            setInstagram(userProfile.instagram)
            setGithub(userProfile.github)
            setLinkedin(userProfile.linkedin)
            if (userProfile.gmail === '') {
                setGmail(userInfo.email)
            } else {
                setGmail(userProfile.gmail)
            }
            setWebsite(userProfile.website)
        }

        if (userInfoUpdateSuccess) {
            dispatch({type: PROFILE_DETAILS_RESET})
        }
    }, [userInfo, dispatch, userProfile, error, userInfoUpdateSuccess])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Social Media Informations</h2>
            </div>
           
            <div className='container card-body py-5' styles={{display: 'grid'}}>
                <form onSubmit={submitHandler}>
                    <select className="form-control mb-4" onChange={(e) => setSelectInput(e.target.value)} value={selectInput}>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Github</option>
                        <option>Linkedin</option>
                        <option>Gmail</option>
                        <option>Website</option>
                    </select>
                    
                    <div className="form-groupm">
                        <input type="url" required className="form-control" placeholder="Enter Link" value={txtInput} onChange={(e) => setTxtInput(e.target.value)} />
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>

                {loading && <div className='container my-5'><Loader /></div>}

                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100"
                            style={{ backgroundColor: '#4064AC', borderRadius: '12px'}}
                        >
                            <h5 className="py-3">Facebook</h5>
                            <small className="pb-3">
                                {facebook}
                            </small>
                        </div>
                    </div>

                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100 instaCard"
                            style={{ borderRadius: '12px'}}
                        >
                            <h5 className="py-3">Instagram</h5>
                            <small className="pb-3">
                                {instagram}
                            </small>
                        </div>
                    </div>

                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100"
                            style={{ backgroundColor: '#333', borderRadius: '12px'}}
                        >
                            <h5 className="py-3">Github</h5>
                            <small className="pb-3">
                                {github}
                            </small>
                        </div>
                    </div>

                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100"
                            style={{ backgroundColor: '#0077b5', borderRadius: '12px'}}
                        >
                            <h5 className="py-3">LinkedIn</h5>
                            <small className="pb-3">
                                {linkedin}
                            </small>
                        </div>
                    </div>

                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100 gmailCard"
                            style={{ borderRadius: '12px'}}
                        >
                            <h5 className="py-3">Gmail</h5>
                            <small className="pb-3">
                                {gmail}
                            </small>
                        </div>
                    </div>

                    
                    <div className="col mb-3">
                        <div 
                            className="card text-center text-white h-100 bg-warning"
                            style={{ borderRadius: '12px'}}
                        >
                            <h5 className="py-3">Website</h5>
                            <small className="pb-3">
                                {website}
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <br />
        </div>
    )
}

export default SocialMedia
