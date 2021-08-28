import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoById } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Cv1 from '../cv/Cv1'
import Cv2 from '../cv/Cv2'

const Cv = ({ match }) => {

    const user = match.params.user

    const dispatch = useDispatch()

    const userProfileDetailsById = useSelector(state => state.userProfileDetailsById)
    const {loading, userProfileById} = userProfileDetailsById

    useEffect(() => {        
        if (!userProfileById || !userProfileById.name) {
            dispatch(getUserInfoById(user))
        }
    }, [dispatch, userProfileById, user])

    return (
        <div>
            {
                loading    
                    ? <Loader />
                    : (
                        <>
                        {userProfileById === undefined ? <div className="m-5 text-center"><Message variant='danger'>No active account found with the given credentials!</Message></div> : (
                            <>
                                {userProfileById.cv === 'cv1' && <Cv1 myBgColor="#D0CECF" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv2' && <Cv1 myBgColor="#333333" myColor="#ddd" user={user} />}
                                {userProfileById.cv === 'cv3' && <Cv1 myBgColor="#F7DBC6" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv4' && <Cv1 myBgColor="#629046" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv5' && <Cv1 myBgColor="#2E75B7" myColor="#ddd" user={user} />}
                                {userProfileById.cv === 'cv6' && <Cv1 myBgColor="#93172D" myColor="#ddd" user={user} />}

                                {userProfileById.cv === 'cv7' && <Cv2 myBgColor="#D0CECF" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv8' && <Cv2 myBgColor="#333333" myColor="#ddd" user={user} />}
                                {userProfileById.cv === 'cv9' && <Cv2 myBgColor="#F7DBC6" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv10' && <Cv2 myBgColor="#629046" myColor="#333" user={user} />}
                                {userProfileById.cv === 'cv11' && <Cv2 myBgColor="#2E75B7" myColor="#ddd" user={user} />}
                                {userProfileById.cv === 'cv12' && <Cv2 myBgColor="#93172D" myColor="#ddd" user={user} />}
                            </>
                        )}
                        </>
                    )
            }      
        </div>
    )
}

export default Cv
