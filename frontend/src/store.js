import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { 
    productListReducer, 
    productDetailsReducer, 
    productReviewCreateReducer 
} from './reducers/productReducers'
import { 
    userLoginReducer, 
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userProfileDetailsReducer,
    userInfoUpdateReducer,
    addSkillReducer, 
    deleteSkillReducer,
    addEducationReducer, 
    deleteEducationReducer,
    addExperienceReducer, 
    deleteExperienceReducer,
    addLanguageReducer, 
    deleteLanguageReducer,
    userProfileDetailsByIdReducer,
    updateCvReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productReviewCreate: productReviewCreateReducer,
    userProfileDetails: userProfileDetailsReducer,
    userInfoUpdate: userInfoUpdateReducer,
    skillAdd: addSkillReducer,  
    skillDelete: deleteSkillReducer,
    educationAdd: addEducationReducer,  
    educationDelete: deleteEducationReducer,
    experienceAdd: addExperienceReducer,  
    experienceDelete: deleteExperienceReducer,
    languageAdd: addLanguageReducer,  
    languageDelete: deleteLanguageReducer,
    userProfileDetailsById: userProfileDetailsByIdReducer,
    updateCv: updateCvReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store