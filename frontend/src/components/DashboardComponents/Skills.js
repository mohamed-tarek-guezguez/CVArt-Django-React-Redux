import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, addSkill, deleteSkill } from '../../actions/userActions';
import Loader from '../Loader'
import {PROFILE_DETAILS_RESET, SKILL_ADD_RESET} from '../../constants/userConstants';
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Skills = () => {

    const dispatch = useDispatch()

    const colors =  ['#fe3b3b', '#1a4966', '#53aa2c', '#66406f',]
    const colorsName =  ['orange', 'blue', 'green', 'purple',]

    const [skillName, setSkillName] = useState('')
    const [skillValue, setSkillValue] = useState(0)
    const [skillsTab, setSkillsTab] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const skillAdd = useSelector(state => state.skillAdd)
    const { success: skillAddSuccess } = skillAdd

    const skillDelete = useSelector(state => state.skillDelete)
    const { success: skillDeleteSuccess } = skillDelete

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch({ type: PROFILE_DETAILS_RESET })
        dispatch(addSkill({
            "skillName": skillName,
            "skillValue": skillValue
        }))
        setSkillName('')
        setSkillValue('')
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
                dispatch({ type: PROFILE_DETAILS_RESET })
                dispatch(deleteSkill(id))
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
            setSkillsTab(userProfile.skills)
        }

        if (skillAddSuccess || skillDeleteSuccess) {
            dispatch({type: SKILL_ADD_RESET})
        }
    }, [userInfo, dispatch, userProfile, error, skillAddSuccess, skillDeleteSuccess])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Skills Informations</h2>
            </div>
            
            <div className='container card-body py-5' styles={{display: 'grid'}}>
                <form onSubmit={submitHandler}>                       
                    <div className="form-groupm mb-4">
                        <input required type="text" className="form-control" placeholder="Enter Skill" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                    </div>

                    <div className="form-groupm">
                        <input required type="number" min="0" max="100" className="form-control" placeholder="Pourcentage" value={skillValue} onChange={(e) => setSkillValue(e.target.value)} />
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            {loading && <div className='container my-5'><Loader /></div>}
                    
                            {skillsTab.map((skill, index) => (
                                <div key={index}>
                                    <small style={{ float: 'right'}}>
                                        <button className="btn py-0" onClick={() => deleteHandler(skill.id)}>
                                            <i className="fas fa-times text-danger"></i>  
                                        </button>
                                    </small>
                                    <h3 className="progress-title">{skill.skillName}</h3>
                                    <div className={`progress ${colorsName[index%4]}`}>
                                        <div className="progress-bar" style={{ width: `${skill.skillValue}%`, background: `${colors[index%4]}`}}>
                                            <div className="progress-value">{skill.skillValue}%</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <br />
        </div>
    )
}

export default Skills
