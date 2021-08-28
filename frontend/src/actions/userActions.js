import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,

    USER_INFO_UPDATE_REQUEST,
    USER_INFO_UPDATE_SUCCESS,
    USER_INFO_UPDATE_FAIL,

    SKILL_ADD_REQUEST,
    SKILL_ADD_SUCCESS,
    SKILL_ADD_FAIL,

    SKILL_DELETE_REQUEST,
    SKILL_DELETE_SUCCESS,
    SKILL_DELETE_FAIL,

    Education_ADD_REQUEST,
    Education_ADD_SUCCESS,
    Education_ADD_FAIL,

    Education_DELETE_REQUEST,
    Education_DELETE_SUCCESS,
    Education_DELETE_FAIL,

    Experience_ADD_REQUEST,
    Experience_ADD_SUCCESS,
    Experience_ADD_FAIL,

    Experience_DELETE_REQUEST,
    Experience_DELETE_SUCCESS,
    Experience_DELETE_FAIL,

    Language_ADD_REQUEST,
    Language_ADD_SUCCESS,
    Language_ADD_FAIL,
    
    Language_DELETE_REQUEST,
    Language_DELETE_SUCCESS,
    Language_DELETE_FAIL,

    PROFILE_INFO_DETAILS_BY_ID_REQUEST,
    PROFILE_INFO_DETAILS_BY_ID_SUCCESS,
    PROFILE_INFO_DETAILS_BY_ID_FAIL,

    UPDATE_CV_REQUEST,
    UPDATE_CV_SUCCESS,
    UPDATE_CV_FAIL,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ 
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password},
            config
        )
        
        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
}

export const register = (name, email, password) => async (dispatch) => {
    try {

        dispatch({ 
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email': email, 'password': password},
            config
        )
        
        dispatch({ 
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        
        dispatch({ 
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: USER_DETAILS_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(
            `/api/users/${id}/`,
            config
        )
        
        dispatch({ 
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({ 
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )
        
        dispatch({ 
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        
        dispatch({ 
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const getUserProfileDetails = () => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: PROFILE_DETAILS_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(
            `/api/user/info/`,
            config
        )
        
        dispatch({ 
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({ 
            type: PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const updateUserInfo = (infoObject) => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: USER_INFO_UPDATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/user/info/update/`,
            infoObject,
            config
        )
        
        dispatch({ 
            type: USER_INFO_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        
        dispatch({ 
            type: USER_INFO_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const addSkill = (item) => async (dispatch, getState) => {
    try {
        
        dispatch({ 
            type: SKILL_ADD_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.post(
            `/api/user/info/add-skill/`,
            item,
            config
        )

        dispatch({ 
            type: SKILL_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: SKILL_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteSkill = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: SKILL_DELETE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.delete(
            `/api/user/info/delete-skill/${id}/`,
            config
        )

        dispatch({ 
            type: SKILL_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: SKILL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const addEducation = (item) => async (dispatch, getState) => {
    try {
        
        dispatch({ 
            type: Education_ADD_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.post(
            `/api/user/info/add-education/`,
            item,
            config
        )

        dispatch({ 
            type: Education_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Education_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteEducation = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: Education_DELETE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.delete(
            `/api/user/info/delete-education/${id}/`,
            config
        )

        dispatch({ 
            type: Education_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Education_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}


export const addExperience = (item) => async (dispatch, getState) => {
    try {
        
        dispatch({ 
            type: Experience_ADD_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.post(
            `/api/user/info/add-experience/`,
            item,
            config
        )

        dispatch({ 
            type: Experience_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Experience_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteExperience = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: Experience_DELETE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.delete(
            `/api/user/info/delete-experience/${id}/`,
            config
        )

        dispatch({ 
            type: Experience_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Experience_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}


export const addLanguage = (item) => async (dispatch, getState) => {
    try {
        
        dispatch({ 
            type: Language_ADD_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.post(
            `/api/user/info/add-language/`,
            item,
            config
        )

        dispatch({ 
            type: Language_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Language_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteLanguage = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: Language_DELETE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.delete(
            `/api/user/info/delete-language/${id}/`,
            config
        )

        dispatch({ 
            type: Language_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: Language_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const getUserInfoById = (id) => async (dispatch) => {
    try {
        dispatch({ 
            type: PROFILE_INFO_DETAILS_BY_ID_REQUEST 
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const {data} = await axios.get(
            `/api/user/info/${id}/`,
            config
        )

        dispatch({ 
            type: PROFILE_INFO_DETAILS_BY_ID_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: PROFILE_INFO_DETAILS_BY_ID_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const updateCv = (cv) => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: UPDATE_CV_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/user/info/update/cv/`,
            { "cv": cv },
            config
        )
        
        dispatch({ 
            type: UPDATE_CV_SUCCESS,
            payload: data
        })
    } catch (error) {
        
        dispatch({ 
            type: UPDATE_CV_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}