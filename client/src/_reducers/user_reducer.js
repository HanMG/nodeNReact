// 로그인, 유저제한 관련 리듀서
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'

export default function(state = {}, action){
    switch(action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return {...state, register: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        default:
            return state;
    }
}