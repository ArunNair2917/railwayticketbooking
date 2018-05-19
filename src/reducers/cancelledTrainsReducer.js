import {CANCELLED_TRAINS , IS_FETCHING_CANCELLED_TRAINS , ERROR_CANCELLED_TRAINS_BUSY_MESSAGE } from '../actions';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_CANCELLED_TRAINS:
        return {...state , isFetching : true}
    case CANCELLED_TRAINS:
        return {...state , info : action.payload.data , isFetching : false};
    case ERROR_CANCELLED_TRAINS_BUSY_MESSAGE:
        return {...state , errorMessage : true , isFetching : false}
    default:
        return state;
  }
}
