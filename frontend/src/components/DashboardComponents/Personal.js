import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, updateUserInfo } from '../../actions/userActions';
import Loader from '../Loader'
import axios from 'axios'
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Personal = () => {

    const fileInputRef = useRef()

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [professionalTitle, setProfessionalTitle] = useState('')
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    
    const [uploading, setUploading] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserInfo({
            "firstName": firstName,
            "lastName": lastName,
            "professionalTitle": professionalTitle,
            "address": address,
            "birthday": birthday,
            "phone": phone,
            "facebook": "",
            "instagram": "",
            "github": "",
            "linkedin": "",
            "gmail": "",
            "website": "",
            "about": ""
        }))
        toast.dismiss()
        toast.success('Personal informations updated successfully', {
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
            setFirstName(userProfile.firstName)
            setLastName(userProfile.lastName)
            setProfessionalTitle(userProfile.professionalTitle)
            setAddress(userProfile.address)
            setBirthday(userProfile.birthday)
            setPhone(userProfile.phone)
            setImage(userProfile.image)
        }
    }, [userInfo, dispatch, userProfile, error])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(String(reader.result))
        }
        reader.readAsDataURL(file)

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to use this image?",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then( async (result) => {
            if (result.isConfirmed) {
                const formData = new FormData()
                
                formData.append('image', file)
                formData.append('profile_id', userProfile.id)
        
                setUploading(true)
        
                try {
        
                    const config = {
                        headers: { 
                            'Content-Type': 'multipart/form-data'
                        }
                    }
        
                    await axios.post(
                        '/api/user/info/upload/',
                        formData,
                        config
                    )
        
                    setUploading(false)
                    
                } catch (error) {
                    setUploading(false)
                }
            } else {
                setImage(userProfile.image)
            }
        })   
    }

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Personal Informations</h2>
            </div>

            {loading && <div className='container my-5'><Loader /></div>}

            <div className='container card-body my-5' styles={{display: 'grid'}}>
                <center>
                    {
                        uploading 
                            ? <div className='container my-5'><Loader /></div>
                            : (
                                <Avatar 
                                    alt="Profile picture" 
                                    src={image} 
                                    className="mb-5" 
                                    style={{width: '120px', height: '120px', cursor: 'pointer'}} 
                                    onClick={(event) => {
                                        event.preventDefault()
                                        fileInputRef.current.click()
                                    }}
                                />
                            )
                    }
                </center>

                <div style={{ display: 'none' }}>
                    <form className="my-5 d-flex justify-content-center">
                        <div className="form-group">
                            <input 
                                type="file" 
                                className="form-control-file" 
                                accept="image/*"
                                onChange={uploadFileHandler}
                                ref={fileInputRef}
                            />
                        </div>
                    </form>
                </div>


                <form onSubmit={submitHandler}>
                    <TextField type="name" className='w-100 mb-3' label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField type="name" className='w-100 mb-3' label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField type="text" className='w-100 mb-3' label="Professional Title" variant="outlined" value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} />
                    <TextField type="text" className='w-100 mb-4' label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <TextField type="date" className='w-100 mb-3' variant="outlined" label="Birthday" InputLabelProps={{shrink: true}} value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    <TextField type="number" className='w-100' label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <div className='text-center'>
                        <Button type="submit" className='my-5' variant="contained" color="primary">Submit</Button>
                    </div>
                </form>
            </div>

            <br />
        </div>
    )
}

export default Personal
