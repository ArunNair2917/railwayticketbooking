import {RESCHEDULED_TRAINS , IS_FETCHING_RESCHEDULED_TRAINS , ERROR_RESCHEDULED_TRAINS_BUSY_MESSAGE } from '../actions';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_RESCHEDULED_TRAINS:
        return {...state , isFetching : true}
    case RESCHEDULED_TRAINS:
        return {...state , info : action.payload.data , isFetching : false};
    case ERROR_RESCHEDULED_TRAINS_BUSY_MESSAGE:
        return {...state , errorMessage : true , isFetching : false}
    default:
        return state;
  }
}
