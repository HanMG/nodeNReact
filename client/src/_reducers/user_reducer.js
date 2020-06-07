// 로그인, 유저제한 관련 리듀서
import {
    LOGIN_USER
} from '../_actions/types'

export default function(state = {}, action){
    switch(action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        default:
            return state;
    }
}