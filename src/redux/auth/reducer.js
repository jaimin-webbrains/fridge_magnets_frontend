
import authAction from './actions'

const initState = {
    isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') === 'true' : false,
    accessToken: localStorage.getItem('accessToken'),
    user_id:""
}

export default function rootReducer(state = initState, action) {

    switch (action.type) {
        case authAction.LOGIN:
            return {
                ...state,
                isLogin: action.isLogin,
                accessToken: action.accessToken,
                user_id:action.user_id,
                user:action.user
            }
        case authAction.LOGOUT:
            return {
                ...state,
                isLogin: action.isLogin,
                accessToken: null,
                // user:null
            }
    //         case authAction.LOGIN:
    //   return {
    //     ...state,
    //     isLogin: action.isLogin,
    //     accessToken: action.accessToken,
    //     user: action.user
    //   };
    // case authAction.SET_USER:
    //   return {
    //     ...state,
    //     user: action.user
    //   };
        default:
            return state
    }
}