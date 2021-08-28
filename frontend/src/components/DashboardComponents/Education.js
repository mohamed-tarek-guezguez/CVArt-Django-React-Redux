import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, addEducation, deleteEducation } from '../../actions/userActions';
import Loader from '../Loader'
import {PROFILE_DETAILS_RESET, Education_ADD_RESET} from '../../constants/userConstants';
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Education = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [educationTab, setEducationTab] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const educationAdd = useSelector(state => state.educationAdd)
    const { success: educationAddSuccess } = educationAdd

    const educationDelete = useSelector(state => state.educationDelete)
    const { success: educationDeleteSuccess } = educationDelete

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addEducation({
            "title": title,
            "content": content,
            "dateFrom": dateFrom,
            "dateTo": dateTo,
        }))
        dispatch({ type: PROFILE_DETAILS_RESET })
        setTitle('')
        setContent('')
        setDateFrom('')
        setDateTo('')
        toast.dismiss()
        toast.success('Successfully Submitted', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'm-2'
        })
    }

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteEducation(id))
                dispatch({ type: PROFILE_DETAILS_RESET })
                toast.dismiss()
                toast.error('Successfully Deleted', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    className: 'm-2'
                })
            }
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
            setEducationTab(userProfile.educations)
        }

        if (educationAddSuccess || educationDeleteSuccess) {
            dispatch({type: Education_ADD_RESET})
        }
    }, [userInfo, dispatch, userProfile, error, educationAddSuccess, educationDeleteSuccess])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Education Informations</h2>
            </div>
            
            <div className='container card-body py-5' styles={{display: 'grid'}}>
                <form onSubmit={submitHandler}>                       
                    <div className="form-groupm mb-4">
                        <input required type="text" className="form-control" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="form-group mb-4">
                        <textarea required className="form-control" style={{ minHeight: '80px' }} placeholder="Enter Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <div className="row">
                        <div className="col">
                            <TextField required type="number" className='w-100 mb-3' variant="outlined" label="From" InputLabelProps={{shrink: true}} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                        </div>
                        <div className="col">
                            <TextField required type="number" className='w-100 mb-3' variant="outlined" label="To" InputLabelProps={{shrink: true}} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>

                {loading && <div className='container my-5'><Loader /></div>}

                {educationTab.map((education, index) => (
                    <div className="card mb-4" key={index}>
                        <div className="card-header text-muted">
                            <small>
                                From {education.dateFrom} To {education.dateTo}
                            </small>
                            <small style={{ float: 'right'}}>
                                <button className="btn py-0" onClick={() => deleteHandler(education.id)}>
                                    <i className="fas fa-times text-danger"></i>  
                                </button>
                            </small>
                        </div>

                        <div className="card-body">
                            <h6 style={{ fontWeight: 'bold'}}>
                                {education.title}
                            </h6>
                            
                            <small>
                                {education.content}
                            </small>
                        </div>
                    </div>
                ))}
                
                <br />
            </div>
        </div>
    )
}

export default Education
