/**
 * Created by 叶子 on 2017/7/30.
 */
import { combineReducers } from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export const counter = (state = {value: 0}, action) => {
    switch (action.type) {
        case type.INCREMENT:
            return { value : state.value+1 }
        case type.DECREMENT:
            return { value : state.value-1 }
        default:
            return { ...state }
    }
}

const globalName = (state = {name: 'Abduwaly'}, action) => {
    switch (action.type) {
        case type.LOWER_CASE:
            return { name : 'abduwaly' }
        case type.UPPER_CASE:
            return { name : 'ABDUWALY' }
        default:
            return { ...state }
    }
}

const detailsInfo = (state = {visible: false, detailsId: undefined}, action) => {
    switch (action.type) {
        case type.SHOW_M_DETAILS:
            return { visible: true, detailsId: action.data }
        case type.HIDE_M_DETAILS:
            return { visible: false, detailsId: undefined }
        default:
            return { ...state }
    }
}

export default combineReducers({
    httpData,
    globalName,
    detailsInfo
});
