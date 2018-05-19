import axios from 'axios';

const API_KEY = 'gfzi6nuc';

export const LIVE_STATUS = 'LIVE_STATUS';
export const IS_FETCHING_LIVE_STATUS = 'IS_FETCHING_LIVE_STATUS';
export const ERROR_LIVE_STATUS_BUSY_MESSAGE = 'ERROR_LIVE_STATUS_BUSY_MESSAGE';

// export const PNR_STATUS = 'PNR_STATUS';
// export const IS_FETCHING_PNR_STATUS = 'IS_FETCHING_PNR_STATUS';

export const TRAIN_ROUTE = 'TRAIN_ROUTE';
export const IS_FETCHING_TRAIN_ROUTE = 'IS_FETCHING_TRAIN_ROUTE';
export const ERROR_TRAIN_ROUTE_BUSY_MESSAGE = 'ERROR_TRAIN_ROUTE_BUSY_MESSAGE';

export const FETCHING_TRAINS_BETWEEN_STATIONS = 'FETCHING_TRAINS_BETWEEN_STATIONS';
export const IS_FETCHING_TRAINS_BETWEEN_STATIONS = 'IS_FETCHING_TRAINS_BETWEEN_STATIONS';
export const ERROR_FETCHING_TRAINS_BUSY_MESSAGE = 'ERROR_FETCHING_TRAINS_BUSY_MESSAGE';

export const LIVE_STATION = 'LIVE_STATION';
export const IS_FETCHING_LIVE_STATION = 'IS_FETCHING_LIVE_STATION';
export const ERROR_LIVE_STATION_BUSY_MESSAGE = 'ERROR_LIVE_STATION_BUSY_MESSAGE';

export const CANCELLED_TRAINS = 'CANCELLED_TRAINS';
export const IS_FETCHING_CANCELLED_TRAINS = 'IS_FETCHING_CANCELLED_TRAINS';
export const ERROR_CANCELLED_TRAINS_BUSY_MESSAGE = 'ERROR_CANCELLED_TRAINS_BUSY_MESSAGE';

export const RESCHEDULED_TRAINS = 'RESCHEDULED_TRAINS';
export const IS_FETCHING_RESCHEDULED_TRAINS = 'IS_FETCHING_RESCHEDULED_TRAINS';
export const ERROR_RESCHEDULED_TRAINS_BUSY_MESSAGE = 'ERROR_RESCHEDULED_TRAINS_BUSY_MESSAGE';

export {liveStatus , trainRoute , getCancelledTrains , getRescheduledTrains , fetchingLiveStationTrains , fetchingTrainsBetweenStations };

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

export function isFetchingLiveStatus() {
  return{
    type : IS_FETCHING_LIVE_STATUS
  }
}
//
// export function isFetchingPnrStatus() {
//   return{
//     type : IS_FETCHING_PNR_STATUS
//   }
// }

export function isFetchingTrainRoute() {
  return{
    type : IS_FETCHING_TRAIN_ROUTE
  }
}

// export function isFetchingStations() {
//   return{
//     type : IS_FETCHING_STATIONS
//   }
// }

export function isFetchingTrainsBetweenStations() {
  return{
    type : IS_FETCHING_TRAINS_BETWEEN_STATIONS
  }
}

export function isFetchingLiveStationTrains() {
  return{
    type : IS_FETCHING_LIVE_STATION
  }
}

export function isFetchingCancelledTrains() {
  return{
    type : IS_FETCHING_CANCELLED_TRAINS
  }
}

export function isFetchingRescheduledTrains() {
  return{
    type : IS_FETCHING_RESCHEDULED_TRAINS
  }
}

// ERROR_MESSAGES

function recievedLiveStatusBusyError(){
  return {
    type : ERROR_LIVE_STATUS_BUSY_MESSAGE
  }
}

function recievedTrainRouteBusyError(){
  return {
    type : ERROR_TRAIN_ROUTE_BUSY_MESSAGE
  }
}

function recievedTrainsBetweenStationsBusyError(){
  return {
    type : ERROR_FETCHING_TRAINS_BUSY_MESSAGE
  }
}

function recievedLiveStationBusyError(){
  return {
    type : ERROR_LIVE_STATION_BUSY_MESSAGE
  }
}

function recievedCancelledTrainsBusyError(){
  return {
    type : ERROR_CANCELLED_TRAINS_BUSY_MESSAGE
  }
}

function recievedRescheduledTrainsBusyError(){
  return {
    type : ERROR_RESCHEDULED_TRAINS_BUSY_MESSAGE
  }
}



// LIVE_STATUS ACTION CREATORS --> RECIEVED DATA FUNCTION AND THUNK FUNCTION

function recievedLiveStatusData(data) {
  return {
    type : LIVE_STATUS,
    payload : data
  }
}

function liveStatus(train_no , date){
  const formattedTrainNo = (train_no.length===5) ? Number(train_no) : Number(train_no.substr(-6,5));
  const formattedDate = Number(date.yyyymmdd());

  return (dispatch) => {
    dispatch(isFetchingLiveStatus());

    return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedTrainNo}/doj/${formattedDate}/`)
      .then((response) => {
          dispatch(recievedLiveStatusData(response))
      })
      .catch((error) => {
        if (error.response) {
          dispatch(recievedLiveStatusBusyError());
        }
        else if (error.request) {
          dispatch(recievedLiveStatusBusyError());
        } else {
          dispatch(recievedLiveStatusBusyError());
        }
      })
    }
  }

// LIVE STATUS ACITON CREATORS --> END

// // PNR STATUS ACTION CREATOR ---> START
//
// function recievedPnrStatusData(data) {
//   return {
//     type : PNR_STATUS ,
//     payload : data
//   }
// }
//
// function pnrStatus(pnr_Number){
//   const formattedPnrNo = Number(pnr_Number);
//
//   return (dispatch) => {
//     dispatch(isFetchingPnrStatus());
//
//     return axios.get(`http://api.railwayapi.com/pnr_status/pnr/${formattedPnrNo}/apikey/${API_KEY}/`)
//       .then((response) => {
//         if (response.status === 200 || response.status === 204) {
//           dispatch(recievedPnrStatusData(response))
//         }
//         else {
//           throw 404
//         }
//       })
//       .catch((error) => {
//         if (error === 404) {
//           dispatch(recievedError());
//         }
//       })
//     }
//   }
//
// // PNR STATUS ACTION CREATOR -->END

// TRAIN ROUTE ACTION CREATOR -->START

function recievedTrainRouteData(data){
  return{
    type : TRAIN_ROUTE ,
    payload : data
  }
}

function trainRoute(train_no) {

  const formattedTrainNo = (train_no.length===5) ? Number(train_no) : Number(train_no.substr(-6,5));

  return (dispatch) => {
    dispatch(isFetchingTrainRoute());

    return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedTrainNo}/`)
      .then((response) => {
          dispatch(recievedTrainRouteData(response))
      })
      .catch((error) => {
        if (error.response) {
          dispatch(recievedTrainRouteBusyError());
        }
        else if (error.request) {
          dispatch(recievedTrainRouteBusyError());
        } else {
          dispatch(recievedTrainRouteBusyError());
        }
      })
  }
}

// TRAIN ROUTE ACITON CREATOR -->END

// TRAINS BETWEEN STATIONS --->START


  // FETCHING TRAINS BETWEEN STATIONS -->STARTS


  function recievedFetchingTrainsBetweenStationsData(data){
    return{
      type : FETCHING_TRAINS_BETWEEN_STATIONS ,
      payload : data
    }
  }

  function fetchingTrainsBetweenStations(fromStation , toStation , date) {

    var firstFromBracket = fromStation.indexOf('(');
    var lastFromBracket = fromStation.indexOf(')');

    const formattedFromStation = fromStation.slice((firstFromBracket+1) , lastFromBracket);

    var firstToBracket = toStation.indexOf('(');
    var lastToBracket = toStation.indexOf(')');

    const formattedToStation = toStation.slice((firstToBracket+1) , lastToBracket);

    var dateForFormattedDate = date.getDate();
    var monthForFormattedDate = date.getMonth()+1;

    const formattedDate = `${dateForFormattedDate}-${monthForFormattedDate}`;

    return (dispatch) => {
      dispatch(isFetchingTrainsBetweenStations());

      return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedFromStation}/dest/${formattedToStation}/date/${formattedDate}/`)
        .then((response) => {
            dispatch(recievedFetchingTrainsBetweenStationsData(response))
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status);
            dispatch(recievedTrainsBetweenStationsBusyError());
          }
          else if (error.request) {
            dispatch(recievedTrainsBetweenStationsBusyError());
            console.log(error.request);
          } else {
            dispatch(recievedTrainsBetweenStationsBusyError());
          }
        })
    }
  }

  // FETCHING TRAINS BETWEEN STATIONS -->ENDS

// TRAINS BETWEEN STATIONS --->ENLiveStationD

// LIVE STATION STARTS --> STARTS



  function recievedFetchingLiveStationTrains(data){
    return{
      type : LIVE_STATION ,
      payload : data
    }
  }

  function fetchingLiveStationTrains(fromStation , hours) {

    var firstFromBracket = fromStation.indexOf('(');
    var lastFromBracket = fromStation.indexOf(')');

    const formattedFromStation = fromStation.slice((firstFromBracket+1) , lastFromBracket);

    return (dispatch) => {
      dispatch(isFetchingLiveStationTrains());

      return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedFromStation}/hours/${hours}/`)
        .then((response) => {
            dispatch(recievedFetchingLiveStationTrains(response))
        })
        .catch((error) => {
          if (error.response) {
            dispatch(recievedLiveStationBusyError());
          }
          else if (error.request) {
            dispatch(recievedLiveStationBusyError());
          } else {
            dispatch(recievedLiveStationBusyError());
          }
        })
    }
  }

// LIVE STATIONS ENDS --> ENDS

// CANCELLED_TRAINS -->STARTS

function recievedCancelledTrains(data){
  return{
    type : CANCELLED_TRAINS ,
    payload : data
  }
}

function getCancelledTrains(date) {

  var dateForFormattedDate = date.getDate();
  var monthForFormattedDate = date.getMonth()+1;
  var yearForFormattedDate = date.getFullYear();

  const formattedDate = `${dateForFormattedDate}-${monthForFormattedDate}-${yearForFormattedDate}`;

return (dispatch) => {
    dispatch(isFetchingCancelledTrains());

    return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedDate}/cancelled`)
      .then((response) => {
          dispatch(recievedCancelledTrains(response))
      })
      .catch((error) => {
        if (error.response) {
          dispatch(recievedCancelledTrainsBusyError());
        }
        else if (error.request) {
          dispatch(recievedCancelledTrainsBusyError());
        } else {
          dispatch(recievedCancelledTrainsBusyError());
        }
      })
  }
}

// CANCELLED_TRAINS -->ENDS

// RESCHEDULED_TRAINS -->STARTS

function recievedRescheduledTrains(data){
  return{
    type : RESCHEDULED_TRAINS ,
    payload : data
  }
}

function getRescheduledTrains(date) {

  var dateForFormattedDate = date.getDate();
  var monthForFormattedDate = date.getMonth()+1;
  var yearForFormattedDate = date.getFullYear();

  const formattedDate = `${dateForFormattedDate}-${monthForFormattedDate}-${yearForFormattedDate}`;

return (dispatch) => {
    dispatch(isFetchingRescheduledTrains());

    return axios.get(`https://aqueous-refuge-57627.herokuapp.com/${formattedDate}/rescheduled`)
      .then((response) => {
          dispatch(recievedRescheduledTrains(response))
      })
      .catch((error) => {
        if (error.response) {
          dispatch(recievedRescheduledTrainsBusyError());
        }
        else if (error.request) {
          dispatch(recievedRescheduledTrainsBusyError());
        } else {
          dispatch(recievedRescheduledTrainsBusyError());
        }
      })
  }
}

// RESCHEDULED_TRAINS -->ENDS
