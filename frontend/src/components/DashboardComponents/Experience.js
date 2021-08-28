import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, addExperience, deleteExperience } from '../../actions/userActions';
import Loader from '../Loader'
import {PROFILE_DETAILS_RESET, Experience_ADD_RESET} from '../../constants/userConstants';
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Experience = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [experienceTab, setExperienceTab] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const experienceAdd = useSelector(state => state.experienceAdd)
    const { success: experienceAddSuccess } = experienceAdd

    const experienceDelete = useSelector(state => state.experienceDelete)
    const { success: experienceDeleteSuccess } = experienceDelete

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addExperience({
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
                dispatch(deleteExperience(id))
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
            setExperienceTab(userProfile.experiences)
        }

        if (experienceAddSuccess || experienceDeleteSuccess) {
            dispatch({type: Experience_ADD_RESET})
        }
    }, [userInfo, dispatch, userProfile, error, experienceAddSuccess, experienceDeleteSuccess])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Experience Informations</h2>
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
                            <TextField required type="date" className='w-100 mb-3' variant="outlined" label="From" InputLabelProps={{shrink: true}} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                        </div>
                        <div className="col">
                            <TextField required type="date" className='w-100 mb-3' variant="outlined" label="To" InputLabelProps={{shrink: true}} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                        </div>
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>

                {loading && <div className='container my-5'><Loader /></div>}
                
                {experienceTab.map((experience, index) => (
                    <div className="card mb-4" key={index}>
                        <div className="card-header text-muted">
                            <small>
                                From {experience.dateFrom} To {experience.dateTo}
                            </small>
                            <small style={{ float: 'right'}}>
                                <button className="btn py-0" onClick={() => deleteHandler(experience.id)}>
                                    <i className="fas fa-times text-danger"></i>  
                                </button>
                            </small>
                        </div>

                        <div className="card-body">
                            <h6 style={{ fontWeight: 'bold'}}>
                                {experience.title}
                            </h6>
                            
                            <small>
                                {experience.content}
                            </small>
                        </div>
                    </div>
                ))}

                <br />
            </div>
        </div>
    )
}

export default Experience
