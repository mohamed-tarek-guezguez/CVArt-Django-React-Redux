import './Cv.css'
import React, { useState, useEffect } from 'react'
import {ProgressBar} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import Personal from '../components/DashboardComponents/Personal'
import SocialMedia from '../components/DashboardComponents/SocialMedia'
import Languages from '../components/DashboardComponents/Languages'
import About from '../components/DashboardComponents/About'
import Education from '../components/DashboardComponents/Education'
import Experience from '../components/DashboardComponents/Experience'
import Skills from '../components/DashboardComponents/Skills'

import { updateUserInfo, getUserInfoById, getUserProfileDetails } from '../actions/userActions';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Cv2 = ({myBgColor, myColor, user}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userProfileDetailsById = useSelector(state => state.userProfileDetailsById)
    const {userProfileById} = userProfileDetailsById

    const [isEditable, setIsEditable] = useState(false)
    const [helpAlert, setHelpAlert] = useState(true)

    const [firstNameEdit, setFirstNameEdit] = useState(false)
    const [lastNameEdit, setLastNameEdit] = useState(false)
    const [professionalTitleEdit, setProfessionalTitleEdit] = useState(false)
    const [addressEdit, setAddressEdit] = useState(false)
    const [phoneEdit, setPhoneEdit] = useState(false)
    const [birthdayEdit, setBirthdayEdit] = useState(false)
    const [gmailEdit, setGmailEdit] = useState(false)
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [professionalTitle, setProfessionalTitle] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gmail, setGmail] = useState('')

    const [firstNameDetails, setFirstNameDetails] = useState('')
    const [lastNameDetails, setLastNameDetails] = useState('')
    const [professionalTitleDetails, setProfessionalTitleDetails] = useState('')
    const [addressDetails, setAddressDetails] = useState('')
    const [phoneDetails, setPhoneDetails] = useState('')
    const [birthdayDetails, setBirthdayDetails] = useState('')
    const [gmailDetails, setGmailDetails] = useState('')

    const [showPersonal, setShowPersonal] = useState(false)
    const [showSocialMedia, setShowSocialMedia] = useState(false)
    const [showLanguages, setShowLanguages] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const [showEducation, setShowEducation] = useState(false)
    const [showExperience, setShowExperience] = useState(false)
    const [showSkill, setShowSkill] = useState(false)

    const firstNameReset = () => {
        setFirstNameEdit(false)
        setFirstName('')

    }
    const lastNameReset = () => {
        setLastNameEdit(false)
        setLastName('')
    }
    const professionalTitleReset = () => {
        setProfessionalTitleEdit(false)
        setProfessionalTitle('')
    }
    const addressReset = () => {
        setAddressEdit(false)
        setAddress('')
    }
    const phoneReset = () => {
        setPhoneEdit(false)
        setPhone('')
    }
    const birthdayReset = () => {
        setBirthdayEdit(false)
        setBirthday('')
    }
    const gmailReset = () => {
        setGmailEdit(false)
        setGmail('')
    }

    const SubmitHandler = () => {
        if (firstName !== '' || lastName !== '' || professionalTitle !== '' || address !== '' || phone !== '' || birthday !== '' || gmail !== '') {
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
                "gmail": gmail, 
                "website": "", 
                "about": ""
            }))
            toast.dismiss()
            toast.success('Updated successfully', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'm-2'
            })
        }

        if (firstName !== '') setFirstNameDetails(firstName)
        if (lastName !== '') setLastNameDetails(lastName)
        if (professionalTitle !== '') setProfessionalTitleDetails(professionalTitle)
        if (address !== '') setAddressDetails(address)
        if (phone !== '') setPhoneDetails(phone)
        if (birthday !== '') setBirthdayDetails(birthday)
        if (gmail !== '') setGmailDetails(gmail)

        firstNameReset()
        lastNameReset()
        professionalTitleReset()
        addressReset()
        phoneReset()
        birthdayReset()
        gmailReset()

        dispatch(getUserProfileDetails())
    }

    const modalHandler = () => {
        setShowSkill(false)
        setShowExperience(false)
        setShowEducation(false)
        setShowAbout(false)
        setShowLanguages(false)
        setShowSocialMedia(false)
        setShowPersonal(false)
        dispatch(getUserInfoById(user))
        dispatch(getUserProfileDetails())
    }

    const showPersonalModel = () => {
        if (isEditable) setShowPersonal(true)
    }

    useEffect(() => {   
        if (userInfo) {
            if (userProfileById.name === userInfo.username) {
                setIsEditable(true)
            }
        }

        setFirstNameDetails(userProfileById.firstName)
        setLastNameDetails(userProfileById.lastName)
        setProfessionalTitleDetails(userProfileById.professionalTitle)
        setAddressDetails(userProfileById.address)
        setPhoneDetails(userProfileById.phone)
        setBirthdayDetails(userProfileById.birthday)
        setGmailDetails(userProfileById.gmail)
    }, [userProfileById, userInfo])

    return (
        <>

        {(isEditable && helpAlert) && (
            <div className="container my-4">
                <div className="alert alert-warning" role="alert">
                    You are in edit mode, <button className="btn btn-sm p-0 m-0 text-info" onClick={() => setIsEditable(false)}><b>click here</b></button> or log out to see your resume
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setHelpAlert(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )}

        <div className="container card p-0 rounded grid__container2" style={{ borderRadius: '4px 4px 0 0' }}>
            <div className="sidebar" style={{ backgroundColor: myBgColor, color: myColor, borderRadius: '4px 4px 0 0' }}>
                <div className="user">
                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="h-100 d-flex justify-content-center align-items-center">
                                <img 
                                    src={userProfileById.image} 
                                    alt="profile-pic" 
                                    className="mb-4"
                                    onClick={showPersonalModel}
                                    style={{ cursor: isEditable && 'pointer', width: '150px', height: '150px', borderRadius: '50%'}}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <h1 className="py-2">
                                {
                                    isEditable && firstNameEdit
                                        ? (
                                            <div className="input-group mb-1">
                                                <input type="text" required className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                    <i className="fas fa-check text-success small"></i>
                                                </button>
                                                <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={firstNameReset}>
                                                    <i className="fas fa-times text-danger"></i>
                                                </button>
                                            </div>
                                        )
                                        :(
                                            <p className={isEditable ? 'mb-1 py-0 update-info' : 'my-0 py-0'} onDoubleClick={() => setFirstNameEdit(true)}>
                                                {firstNameDetails}
                                            </p>
                                        )
                                }

                                {
                                    isEditable && lastNameEdit
                                        ? (
                                            <div className="input-group my-1">
                                                <input type="text" required className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                    <i className="fas fa-check text-success small"></i>
                                                </button>
                                                <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={lastNameReset}>
                                                    <i className="fas fa-times text-danger"></i>
                                                </button>
                                            </div>
                                        )
                                        :(
                                            <p className={isEditable ? 'my-0 py-1 update-info' : 'my-0 py-1'} onDoubleClick={() => setLastNameEdit(true)}>
                                                {lastNameDetails}
                                            </p>
                                        )
                                }
                            </h1>

                            {
                                isEditable && professionalTitleEdit
                                    ? (
                                        <div className="input-group mb-3">
                                            <input type="text" required className="form-control" placeholder="Professional Title" value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} />
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                <i className="fas fa-check text-success small"></i>
                                            </button>
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={professionalTitleReset}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                        </div>
                                    )
                                    :(
                                        <p className={isEditable ? 'professionalTitle update-info' : 'professionalTitle'} style={{fontWeight: 'bold'}} onDoubleClick={() => setProfessionalTitleEdit(true)}>
                                            {professionalTitleDetails}
                                        </p>
                                    )
                            }

                            {
                                isEditable && (
                                    <>
                                    <div className="d-flex justify-content-between">
                                        <h2 style={{fontWeight: 'bold'}}>Social Media</h2>
                                        {isEditable && (
                                            <button className="btn py-0 px-2" onClick={() => setShowSocialMedia(true)}>
                                                <i className="fas fa-pen text-warning"></i>
                                            </button>
                                        )}
                                    </div>
                                    <hr className="mt-0" />
                                    </>
                                )
                            }

                            <div className="d-flex text-dark mb-4" style={{ fontSize: '28px'}}>
                                {userProfileById.facebook && (
                                    <a href={userProfileById.facebook} rel="noopener noreferrer" target="_blank">
                                        <i className="fab fa-facebook-square pr-2" style={{ color: myColor }}></i>
                                    </a>
                                )}

                                {userProfileById.instagram && (
                                    <a href={userProfileById.instagram} rel="noopener noreferrer" target="_blank">
                                        <i className="fab fa-instagram-square pr-2" style={{ color: myColor }}></i>
                                    </a>
                                )}

                                {userProfileById.github && (
                                    <a href={userProfileById.github} rel="noopener noreferrer" target="_blank">
                                        <i className="fab fa-github-square pr-2" style={{ color: myColor }}></i>
                                    </a>
                                )}

                                {userProfileById.linkedin && (
                                    <a href={userProfileById.linkedin} rel="noopener noreferrer" target="_blank">
                                        <i className="fab fa-linkedin pr-2" style={{ color: myColor }}></i>
                                    </a>
                                )}

                                {userProfileById.website && (
                                    <a href={userProfileById.website} rel="noopener noreferrer" target="_blank">
                                        <i className="fas fa-globe pr-2" style={{ color: myColor }}></i>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="col">
                            <h2 className="pt-2" style={{fontWeight: 'bold'}}>Contact</h2>
                            <hr className="mt-0" />

                            <h5 style={{fontWeight: 'bold'}}>Address:</h5>
                            {
                                isEditable && addressEdit
                                    ? (
                                        <div className="input-group my-2">
                                            <input type="text" required className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                <i className="fas fa-check text-success small"></i>
                                            </button>
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={addressReset}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                        </div>
                                    )
                                    :(
                                        <h5 className={isEditable ? 'mb-3 update-info' : 'mb-3'} onDoubleClick={() => setAddressEdit(true)}>
                                            {addressDetails}
                                        </h5>
                                    )
                            }

                            <h5 style={{fontWeight: 'bold'}}>Birthday:</h5>
                            {
                                isEditable && birthdayEdit
                                    ? (
                                        <div className="input-group my-2">
                                            <input type="date" required className="form-control" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                <i className="fas fa-check text-success small"></i>
                                            </button>
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={birthdayReset}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                        </div>
                                    )
                                    :(
                                        <h5 className={isEditable ? 'mb-3 update-info' : 'mb-3'} onDoubleClick={() => setBirthdayEdit(true)}>
                                            {birthdayDetails}
                                        </h5>
                                    )
                            }

                            <h5 style={{fontWeight: 'bold'}}>Phone:</h5>
                            {
                                isEditable && phoneEdit
                                    ? (
                                        <div className="input-group my-2">
                                            <input type="number" required className="form-control" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={SubmitHandler}>
                                                <i className="fas fa-check text-success small"></i>
                                            </button>
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={phoneReset}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                        </div>
                                    )
                                    :(
                                        <h5 className={isEditable ? 'mb-3 update-info' : 'mb-3'} onDoubleClick={() => setPhoneEdit(true)}>
                                            {phoneDetails}
                                        </h5>
                                    )
                            }

                            <h5 style={{fontWeight: 'bold'}}>Email:</h5>
                            {
                                isEditable && gmailEdit
                                    ? (
                                        <div className="input-group my-2">
                                            <input type="email" className="form-control" required placeholder="Email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}}onClick={SubmitHandler}>
                                                <i className="fas fa-check text-success small"></i>
                                            </button>
                                            <button className="btn btn-light border m-0 px-2" style={{ borderRadius: '0'}} onClick={gmailReset}>
                                                <i className="fas fa-times text-danger"></i>
                                            </button>
                                        </div>
                                    )
                                    :(    
                                        <h5 className={isEditable ? 'mb-3 update-info' : 'mb-3'} onDoubleClick={() => setGmailEdit(true)}>
                                            {gmailDetails}
                                        </h5>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                {(isEditable || userProfileById.about !== '') && (
                    <>
                    <div className="d-flex justify-content-between pt-2">
                        <h2 style={{fontWeight: 'bold'}}>About us</h2>
                        {isEditable && (
                            <button className="btn py-0 px-2" onClick={() => setShowAbout(true)}>
                                <i className="fas fa-pen text-warning"></i>
                            </button>
                        )}
                    </div>
                    <hr className="mt-0" />
                    </>
                )}
                <p className="my-p mb-3" style={{ whiteSpace: 'pre-line'}}>{userProfileById.about}</p>
                
                {userProfileById.educations && (
                    <>
                    {(isEditable || userProfileById.educations.length !== 0) && (
                        <>
                        <div className="d-flex justify-content-between pt-3">
                            <h2 style={{fontWeight: 'bold'}}>Education</h2>
                            {isEditable && (
                                <button className="btn py-0 px-2" onClick={() => setShowEducation(true)}>
                                    <i className="fas fa-pen text-warning"></i>
                                </button>
                            )}
                        </div>
                        <hr className="mt-0" />
                        </>
                    )}
                        {userProfileById.educations.map((education, index) => (
                            <div key={index}>                                
                                <ul className="sessions my-ul">
                                    <li className="my-li">
                                        <div className="time">{education.title}</div>
                                        <p className="my-p">{education.content}</p>
                                        <small>
                                            From {education.dateFrom} To {education.dateTo}
                                        </small>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                {userProfileById.experiences && (
                    <>
                    {(isEditable || userProfileById.experiences.length !== 0) && (
                        <>
                        <div className="d-flex justify-content-between pt-3">
                            <h2 style={{fontWeight: 'bold'}}>Experience</h2>
                            {isEditable && (
                                <button className="btn py-0 px-2" onClick={() => setShowExperience(true)}>
                                    <i className="fas fa-pen text-warning"></i>
                                </button>
                            )}
                        </div>
                        <hr className="mt-0" />
                        </>
                    )}
                        {userProfileById.experiences.map((experience, index) => (
                            <div key={index}>                                
                                <ul className="sessions my-ul">
                                    <li className="my-li">
                                        <div className="time">{experience.title}</div>
                                        <p className="my-p">{experience.content}</p>
                                        <small>
                                            From {experience.dateFrom} To {experience.dateTo}
                                        </small>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </>
                )}

                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-4">
                    <div className="col">
                        {userProfileById.skills && (
                            <>
                                {(isEditable || userProfileById.skills.length !== 0) && (
                                    <>
                                        <div className="d-flex justify-content-between pt-3">
                                            <h2 style={{fontWeight: 'bold'}}>Skill</h2>
                                            {isEditable && (
                                                <button className="btn py-0 px-2" onClick={() => setShowSkill(true)}>
                                                    <i className="fas fa-pen text-warning"></i>
                                                </button>
                                            )}
                                        </div>
                                        <hr className="mt-0" />
                                    </>
                                )}
                                {userProfileById.skills.map((skill, index) => (
                                    <div key={index}>
                                        <h5 style={{fontWeight: 'bold'}}>{skill.skillName}:</h5>
                                        <ProgressBar 
                                            striped 
                                            now={skill.skillValue} 
                                            label={`${skill.skillValue}%`} 
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="col">
                        {userProfileById.languages && (
                            <>
                            {(isEditable || userProfileById.languages.length !== 0) && (
                                <>
                                <div className="d-flex justify-content-between pt-3">
                                    <h2 style={{fontWeight: 'bold'}}>Languages</h2>
                                    {isEditable && (
                                        <button className="btn py-0 px-2" onClick={() => setShowLanguages(true)}>
                                            <i className="fas fa-pen text-warning"></i>
                                        </button>
                                    )}
                                </div>
                                <hr className="mt-0" />
                                </>
                            )}
                                {userProfileById.languages.map((language, index) => (
                                    <div key={index}>
                                        <h5 style={{fontWeight: 'bold'}}>{language.languageName}:</h5>
                                        <ProgressBar 
                                            striped 
                                            now={language.languageValue} 
                                            label={`${language.languageValue}%`} 
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

            </div>

            <Modal
                size="xl"
                show={showPersonal}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Personal />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showSocialMedia}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <SocialMedia />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showLanguages}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Languages />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showAbout}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <About />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showEducation}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Education />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showExperience}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Experience />
                </Modal.Body>
            </Modal>

            <Modal
                size="xl"
                show={showSkill}
                dialogClassName="modal-90w"
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-flex justify-content-end">
                    <button className="btn" onClick={modalHandler}>
                        <i className="fas fa-times"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Skills />
                </Modal.Body>
            </Modal>

        </div>
        </>
    )
}

export default Cv2
