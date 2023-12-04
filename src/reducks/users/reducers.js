import * as Actions from './actions'
import initialState from '../redusers/initialState'



export const fxReducer = (state = initialState.fx, action) => {
    console.log('reducers')
    console.log(action)
    switch (action.type) {
        case Actions.GET_FX:
            // console.log(action.type)
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const userReducer = (state = initialState.users, action) => {
    console.log('reducers user')
    console.log(action)
    switch (action.type) {
        case Actions.SIGN_IN:
            // console.log(action.type)
            return {
                ...state,
                ...action.payload
            }

        case Actions.SIGN_OUT:
            console.log('ggggg')
            return{
                ...action.payload
            }
        case Actions.FETCH_PRODUCT_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            }
        case Actions.FETCH_HISTORYS:
            return {
                ...state,
                orders: [...action.payload]
            }
        default:
            return state
    }
}
