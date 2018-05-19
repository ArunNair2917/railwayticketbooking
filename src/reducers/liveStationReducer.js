import {LIVE_STATION , IS_FETCHING_LIVE_STATION , ERROR_LIVE_STATION_BUSY_MESSAGE } from '../actions';

const INITIAL_STATE = { info : null , isFetching : false , errorMessage : false };

export default function(state = INITIAL_STATE , action){
  switch (action.type) {
    case IS_FETCHING_LIVE_STATION:
        return {...state , isFetching : true}
    case LIVE_STATION:
        return {...state , info : action.payload.data , isFetching : false};
    case ERROR_LIVE_STATION_BUSY_MESSAGE:
        return {...state , errorMessage : true , isFetching : false}
    default:
        return state;
  }
}
