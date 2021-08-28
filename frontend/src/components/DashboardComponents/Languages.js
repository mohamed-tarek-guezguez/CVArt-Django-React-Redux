import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileDetails, addLanguage, deleteLanguage } from '../../actions/userActions';
import Loader from '../Loader'
import {PROFILE_DETAILS_RESET, Language_ADD_RESET} from '../../constants/userConstants';
import Swal from 'sweetalert2'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Languages = () => {

    const LanguagesList = [
        'English',
        'French',
        'Arabic',
        'Turkish',
        'Russian',
        'Italian',
        'Chinese',
        'Japanese',
        'Hindi',
        'Spanish',
        'German',
    ]

    const dispatch = useDispatch()

    const colors =  ['#fe3b3b', '#1a4966', '#53aa2c', '#66406f',]
    const colorsName =  ['orange', 'blue', 'green', 'purple',]

    const [languageName, setLanguageName] = useState('English')
    const [languageValue, setLanguageValue] = useState(0)
    const [languagesTab, setLanguagesTab] = useState([])

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetails = useSelector(state => state.userProfileDetails)
    const {error, loading, userProfile} = userProfileDetails

    const languageAdd = useSelector(state => state.languageAdd)
    const { success: languageAddSuccess } = languageAdd

    const languageDelete = useSelector(state => state.languageDelete)
    const { success: languageDeleteSuccess } = languageDelete

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(addLanguage({
            "languageName": languageName,
            "languageValue": languageValue,
        }))
        dispatch({ type: PROFILE_DETAILS_RESET })
        setLanguageName('English')
        setLanguageValue('')
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
                dispatch(deleteLanguage(id))
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
            setLanguagesTab(userProfile.languages)
        }

        if (languageAddSuccess || languageDeleteSuccess) {
            dispatch({type: Language_ADD_RESET})
        }
    }, [userInfo, dispatch, userProfile, error, languageAddSuccess, languageDeleteSuccess])

    return (
        <div className='card w-100 h-100 sideBox' style={{ overflow: 'scroll'}}>
            <div className='text-center' style={{ backgroundColor: '#333333', color: 'white' }}>
                <h2 className='py-4'>Languages</h2>
            </div>
            
            <div className='container card-body py-5' styles={{display: 'grid'}}>
                <form onSubmit={submitHandler}>
                    <select className="form-control mb-4" onChange={(e) => setLanguageName(e.target.value)} value={languageName}>
                        {LanguagesList.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                    
                    <div className="form-groupm">
                        <input required type="number" min="0" max="100" className="form-control" placeholder="Pourcentage" value={languageValue} onChange={(e) => setLanguageValue(e.target.value)} />
                    </div>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className="my-5">Submit</Button>
                    </div>
                </form>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            {loading && <div className='container my-5'><Loader /></div>}
                    
                            {languagesTab.map((language, index) => (
                                <div key={index}>
                                    <small style={{ float: 'right'}}>
                                        <button className="btn py-0" onClick={() => deleteHandler(language.id)}>
                                            <i className="fas fa-times text-danger"></i>  
                                        </button>
                                    </small>
                                    <h3 className="progress-title">{language.languageName}</h3>
                                    <div className={`progress ${colorsName[index%4]}`}>
                                        <div className="progress-bar" style={{ width: `${language.languageValue}%`, background: `${colors[index%4]}`}}>
                                            <div className="progress-value">{language.languageValue}%</div>
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

export default Languages
