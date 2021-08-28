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
    USER_UPDATE_PROFILE_RESET,

    PROFILE_DETAILS_REQUEST,
    PROFILE_DETAILS_SUCCESS,
    PROFILE_DETAILS_FAIL,
    PROFILE_DETAILS_RESET,

    USER_INFO_UPDATE_REQUEST,
    USER_INFO_UPDATE_SUCCESS,
    USER_INFO_UPDATE_FAIL,
    USER_INFO_UPDATE_RESET,

    SKILL_ADD_REQUEST,
    SKILL_ADD_SUCCESS,
    SKILL_ADD_FAIL,
    SKILL_ADD_RESET,

    SKILL_DELETE_REQUEST,
    SKILL_DELETE_SUCCESS,
    SKILL_DELETE_FAIL,

    Education_ADD_REQUEST,
    Education_ADD_SUCCESS,
    Education_ADD_FAIL,
    Education_ADD_RESET,

    Education_DELETE_REQUEST,
    Education_DELETE_SUCCESS,
    Education_DELETE_FAIL,

    Experience_ADD_REQUEST,
    Experience_ADD_SUCCESS,
    Experience_ADD_FAIL,
    Experience_ADD_RESET,

    Experience_DELETE_REQUEST,
    Experience_DELETE_SUCCESS,
    Experience_DELETE_FAIL,

    Language_ADD_REQUEST,
    Language_ADD_SUCCESS,
    Language_ADD_FAIL,
    Language_ADD_RESET,

    Language_DELETE_REQUEST,
    Language_DELETE_SUCCESS,
    Language_DELETE_FAIL,

    PROFILE_INFO_DETAILS_BY_ID_REQUEST,
    PROFILE_INFO_DETAILS_BY_ID_SUCCESS,
    PROFILE_INFO_DETAILS_BY_ID_FAIL,
    PROFILE_INFO_DETAILS_BY_ID_RESET,

    UPDATE_CV_REQUEST,
    UPDATE_CV_SUCCESS,
    UPDATE_CV_FAIL,
    UPDATE_CV_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const userProfileDetailsReducer = (state = {userProfile: {}}, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_REQUEST:
            return { ...state, loading: true }

        case PROFILE_DETAILS_SUCCESS:
            return { loading: false, userProfile: action.payload }

        case PROFILE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case PROFILE_DETAILS_RESET:
            return {}

        default:
            return state
    }
}

export const userInfoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_INFO_UPDATE_REQUEST:
            return { loading: true }

        case USER_INFO_UPDATE_SUCCESS:
            return { loading: false, success: true, userProfileInfo: action.payload }

        case USER_INFO_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_INFO_UPDATE_RESET:
            return {}

        default:
            return state
    }
}

export const addSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case SKILL_ADD_REQUEST:
            return { loading: true }

        case SKILL_ADD_SUCCESS:
            return { loading: false, success: true }

        case SKILL_ADD_FAIL:
            return { loading: false, error: action.payload }

        case SKILL_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const deleteSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case SKILL_DELETE_REQUEST:
            return { loading: true }

        case SKILL_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SKILL_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addEducationReducer = (state = {}, action) => {
    switch (action.type) {
        case Education_ADD_REQUEST:
            return { loading: true }

        case Education_ADD_SUCCESS:
            return { loading: false, success: true }

        case Education_ADD_FAIL:
            return { loading: false, error: action.payload }

        case Education_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const deleteEducationReducer = (state = {}, action) => {
    switch (action.type) {
        case Education_DELETE_REQUEST:
            return { loading: true }

        case Education_DELETE_SUCCESS:
            return { loading: false, success: true }

        case Education_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addExperienceReducer = (state = {}, action) => {
    switch (action.type) {
        case Experience_ADD_REQUEST:
            return { loading: true }

        case Experience_ADD_SUCCESS:
            return { loading: false, success: true }

        case Experience_ADD_FAIL:
            return { loading: false, error: action.payload }

        case Experience_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const deleteExperienceReducer = (state = {}, action) => {
    switch (action.type) {
        case Experience_DELETE_REQUEST:
            return { loading: true }

        case Experience_DELETE_SUCCESS:
            return { loading: false, success: true }

        case Experience_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addLanguageReducer = (state = {}, action) => {
    switch (action.type) {
        case Language_ADD_REQUEST:
            return { loading: true }

        case Language_ADD_SUCCESS:
            return { loading: false, success: true }

        case Language_ADD_FAIL:
            return { loading: false, error: action.payload }

        case Language_ADD_RESET:
            return {}

        default:
            return state
    }
}

export const deleteLanguageReducer = (state = {}, action) => {
    switch (action.type) {
        case Language_DELETE_REQUEST:
            return { loading: true }

        case Language_DELETE_SUCCESS:
            return { loading: false, success: true }

        case Language_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userProfileDetailsByIdReducer = (state = {userProfileById: {}}, action) => {
    switch (action.type) {
        case PROFILE_INFO_DETAILS_BY_ID_REQUEST:
            return { ...state, loading: true }

        case PROFILE_INFO_DETAILS_BY_ID_SUCCESS:
            return { loading: false, userProfileById: action.payload }

        case PROFILE_INFO_DETAILS_BY_ID_FAIL:
            return { loading: false, error: action.payload }

        case PROFILE_INFO_DETAILS_BY_ID_RESET:
            return {}

        default:
            return state
    }
}

export const updateCvReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CV_REQUEST:
            return { loading: true }

        case UPDATE_CV_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case UPDATE_CV_FAIL:
            return { loading: false, error: action.payload }

        case UPDATE_CV_RESET:
            return {}

        default:
            return state
    }
}