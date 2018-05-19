import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import CurrentPosition from 'material-ui/svg-icons/image/flash-on';
import FiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';
import MyLocation from 'material-ui/svg-icons/maps/my-location';
import Launch from 'material-ui/svg-icons/action/launch';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

class LiveStatusReciever extends Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderLiveStatusData(){
    if (!this.props.liveStatus) {
      return <div></div>
    }else{
      const {response_code} = this.props.liveStatus;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>Either the Train Number is wrong or the information is not available!</div>}/>
      }
      else if (response_code === 510) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>{this.props.liveStatus.error}</div>}/>
      }
      else {
        return (
        <div>
          <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderLiveStatusSuccessData()}/>
        </div>
      )
      }
    }
  }

  renderLiveStatusSuccessData(){


    return (
      <div>

        <div style={{height : '50px' , backgroundColor : '#333' , color : '#FFFFFF' , paddingTop : '13px' , marginBottom : '10px'}}>
          <h4>FETCHED DETAILS</h4>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px'}}>
          <h5>TRAIN NUMBER : {this.props.liveStatus.train_number}</h5>
        </div>

        <div style={{marginTop : '10px' , height : '40px'}}>
          <div style={{float : 'left' , position : 'relative' , width : '10%' , height : '40px' , backgroundColor : '#EEEEEE'}}>
            <CurrentPosition color='#FFAB00' style={{float : 'right' , marginTop : '5px'}}/>
          </div>
          <div style={{float : 'left' , width : '90%' , height : '40px' , position : 'relative' , backgroundColor : '#EEEEEE'}}>
            <h5 style={{ postion : 'relative' , float : 'left' , marginTop : '5px'}}>CURRENT POSITION :</h5>
          </div>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '70px' , color : '#673AB7'}}>
          <h5>{this.props.liveStatus.position}</h5>
        </div>

        <div>
        {this.handlingCurrentScenarioLogic()}
        </div>

        <div>

          <div style={{marginTop : '10px' , height : '40px'}}>
            <div style={{float : 'left' , position : 'relative' , width : '10%' , height : '40px' , backgroundColor : '#EEEEEE'}}>
              <ArrowDownward color='#BF360C' style={{float : 'right' , marginTop : '5px'}}/>
            </div>
            <div style={{float : 'left' , width : '90%' , height : '40px' , position : 'relative' , backgroundColor : '#EEEEEE'}}>
              <h5 style={{ postion : 'relative' , float : 'left' , marginTop : '5px'}}>TRAIN ROUTE :</h5>
            </div>
          </div>

          <div style={{minHeight : '40px'}}>
          {this.trainRoute()}
          </div>
        </div>

      </div>
    )
  }

  latehandling(minutes){

 var hours = this.leftPad(Math.floor(Math.abs(minutes) / 60));
 var minutes = this.leftPad(Math.abs(minutes) % 60);

 return '' + hours +'hrs '+minutes + 'min';

  }

  leftPad(number) {
    return ((number < 10 && number >= 0) ? '0' : '') + number;
  }


  // TRAIN ROUTE HANDLING LOGIC --->

  trainRoute(){
    const {route} = this.props.liveStatus;

    return route.map((item) => {

      return(
        <div style={{marginTop : '5px' , minHeight : '40px'}} key={item.no}>

          <div style={{backgroundColor : '#757575' , color : '#FFFFFF' , fontSize : 'large' , height : '60px'}}>
            <div style={{height : '30px'}}>{item.no}.   {item.station_.name}({item.station_.code})</div>
            <div style={{float : 'left' , width : '50%' , position : 'relative' , height : '30px' , backgroundColor : '#757575' , color : '#FFFFFF' , fontSize : 'large' }}>
              <div style={{float : 'left' , width : '100%'}}>
                <div style={{float : 'right'}}>
                  <span style={{height : '30px' , float : 'left'}}>ARRIVED : </span>
                  <span style={{width : '30px' , float : 'left'}}>{ (item.has_arrived === true) ? <Check color='#8BC34A' style={{ width : '30px' , height : '30px' , float : 'left'}}/> : <Close color='#F44336' style={{width : '30px' , height : '30px' , float : 'left'}}/> }</span>
                </div>
              </div>
            </div>
            <div style={{float : 'left' , width : '50%' , position : 'relative' , height : '30px' , backgroundColor : '#757575' , color : '#FFFFFF' , fontSize : 'large' }}>
              <div style={{float : 'left' , width : '100%' , paddingRight : '5px'}}>
                <div style={{float : 'left'}}>
                  <span style={{height : '30px' , float : 'left'}}>DEPARTED : </span>
                  <span style={{width : '30px' , float : 'left'}}>{ (item.has_departed === true) ? <Check color='#8BC34A' style={{ width : '30px' , height : '30px' , float : 'left'}}/> : <Close color='#F44336' style={{width : '30px' , height : '30px' , float : 'left'}}/> }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{height : '70px' , backgroundColor : '#757575' , paddingTop : '10px'}}>
            <div style={{float : 'left' , position : 'relative' , width : '40%' , height : '60px' , backgroundColor : '#757575' , color : '#FFFFFF' , paddingTop : '15px' , paddingRight : '5px' , fontSize : 'large'}}><div style={{float : 'right'}}>SCHEDULED:</div></div>
            <div style={{float : 'left' , position : 'relative' , width : '60%' , height : '60px' , backgroundColor : '#757575' , color : '#FFFFFF' , paddingLeft : '10px'}}>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>ARR DATE : { (item.scharr === 'Source') ? '--' : item.scharr_date}</div>
              </div>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>ARRIVAL TIME : {(item.scharr === 'Source') ? '--' : item.scharr}</div>
              </div>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>DEPARTURE TIME : {(item.schdep === 'Destination') ? '--' : item.schdep}</div>
              </div>
            </div>
          </div>
          <div style={{height : '85px' , backgroundColor : '#757575' , paddingTop : '10px'}}>
            <div style={{float : 'left' , position : 'relative' , width : '40%' , height : '70px' , backgroundColor : '#757575' , color : '#FFFFFF' , paddingTop : '15px' , paddingRight : '5px' , fontSize : 'large'}}><div style={{float : 'right'}}>ACTUAL/<br/>EXPECTED:</div></div>
            <div style={{float : 'left' , position : 'relative' , width : '60%' , height : '70px' , backgroundColor : '#757575' , color : '#FFFFFF' , paddingLeft : '10px' , paddingTop : '10px'}}>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>ARR DATE : {(item.scharr === 'Source') ? '--' : item.actarr_date}</div>
              </div>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>ARRIVAL TIME : {(item.scharr === 'Source') ? '--' : item.actarr}</div>
              </div>
              <div style={{height : '20px'}}>
                <div style={{float : 'left' , fontSize : 'small'}}>DEPARTURE TIME : {(item.schdep === 'Destination') ? '--' : item.actdep}</div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor : '#757575' , color : '#FFFFFF' , fontSize : 'large' , height : '50px' , paddingTop : '10px'}}>
            <div style={{fontSize : 'medium'}}>DELAY : {(item.latemin)>0 ? <span style={{width : '100px' , color : '#FFAB00' , fontSize : 'medium'}}>{this.latehandling(item.latemin)}</span> : <span style={{width : '100px' , fontSize : 'medium'}}>{this.latehandling(item.latemin)}</span>}&nbsp;&nbsp;&nbsp; (DAY {item.day + 1})</div>
          </div>

        </div>
      )
    })

}

  // TRAIN ROUTE HANDLING LOGIC END <--

  handlingCurrentScenarioLogic(){

    const {current_station , route} = this.props.liveStatus ;

    const route_station = route.filter((item) => {if (current_station.no === item.no) {
        return item ;
    }})

    if (current_station.scharr === 'Source') {
      return this.renderSourceScenario();
    }

    if (current_station.schdep === 'Destination') {
      return this.renderDestinationScenario();
    }

    if (current_station.station === route_station[0].station) {
      if (current_station.has_arrived === true && current_station.has_departed === true) {
        return this.renderCurrentScenarioWhenEqual();
      }
    }

    if (current_station.station !== route_station[0].station){
      return this.renderCurrentScenarioWhenNotEqual();
    }

    if (current_station.station === route_station[0].station) {
      if (current_station.has_arrived === true && current_station.has_departed === false) {
        return this.renderHaltedScenario();
      }
    }

  }

  renderSourceScenario(){
    return(
      <div style={{marginTop : '10px' , height : '170px'}}>
        <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>

          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
              <Launch color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '70px'}}>
            {this.renderSourceCurrentScenario()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
              <FiberManualRecord color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
            {this.renderSourceNextStation()}
          </div>
        </div>

      </div>
    )
  }

  renderSourceCurrentScenario(){
    const {current_station} = this.props.liveStatus ;
      return(
        <div>
          <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`AT SOURCE : ${current_station.station_.name}(${current_station.station_.code})`}</div>
          </div>
        </div>
      )
  }

  renderSourceNextStation(){
    const {current_station , route} = this.props.liveStatus ;
        return (
          <div>
          <div style={{width : '100%' , height : '70px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>NEXT STOPPAGE :</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[current_station.no].station_.name}</div>
          </div>
          </div>
        )
  }

  renderDestinationScenario(){
    return(
      <div style={{marginTop : '10px' , height : '170px'}}>
        <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>

          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
              <FiberManualRecord color='#64DD17' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '70px'}}>
            {this.renderDestinationPreviousStation()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
              <HighlightOff color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
            {this.renderDestinationCurrentScenario()}
          </div>
        </div>

      </div>
    )
  }

  renderDestinationPreviousStation(){
    const {current_station , route} = this.props.liveStatus ;
        return (
          <div>
          <div style={{width : '100%' , height : '70px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>PREVIOUS STOPPAGE :</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[(current_station.no - 2)].station_.name}</div>
          </div>
          </div>
        )
  }

  renderDestinationCurrentScenario(){
    const {current_station} = this.props.liveStatus ;
      return(
        <div>
          <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`AT DESTINATION : ${current_station.station_.name}(${current_station.station_.code})`}</div>
          </div>
        </div>
      )
  }

  renderHaltedScenario(){
    return(
    <div style={{marginTop : '10px' , height : '170px'}}>
      <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>

        <div style={{height : '40px'}}>
          <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <MyLocation color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
        </div>

        <div style={{height : '30px'}}>
          <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
        </div>

        <div style={{height : '70px'}}>
          {this.renderHaltedCurrentScenario()}
        </div>
      </div>

      <div style={{float : 'left' , position : 'relative' , width : '50%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
        <div style={{height : '40px'}}>
          <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <FiberManualRecord color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
        </div>

        <div style={{height : '30px'}}>
          <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
        </div>

        <div style={{height : '80px'}}>
          {this.renderHaltedNextStation()}
        </div>
      </div>

    </div>
    )
  }

  renderHaltedCurrentScenario(){
    const {current_station} = this.props.liveStatus ;
      return(
        <div>
          <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`HALTED AT ${current_station.station_.name}(${current_station.station_.code})`}</div>
          </div>
        </div>
      )
  }

  renderHaltedNextStation(){
    const {current_station , route} = this.props.liveStatus ;
        return (
          <div>
          <div style={{width : '100%' , height : '70px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>NEXT STOPPAGE :</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[current_station.no].station_.name}</div>
          </div>
          </div>
        )
  }

  renderCurrentScenarioWhenEqual(){
    return (
      <div style={{marginTop : '10px' , height : '170px'}}>
        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>

          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <FiberManualRecord color='#64DD17' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '70px'}}>
            {this.renderLastStoppage()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <MyLocation color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
            {this.renderCurrentScenario()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <FiberManualRecord color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
            {this.renderNextStoppage()}
          </div>
        </div>

      </div>
    )
  }


    renderLastStoppage(){

      const {current_station , route} = this.props.liveStatus ;

      const route_station = route.filter((item) => {if (current_station.no === item.no) {
        return item ;
      }})

      if (current_station.station === route_station[0].station) {
          return (
            <div>
            <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>PREVIOUS STOPPAGE :</div>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route_station[0].station_.name}</div>
            </div>
            </div>
          )
      }
    }

    renderCurrentScenario(){

      const {current_station , route} = this.props.liveStatus ;

      const route_station = route.filter((item) => {if (current_station.no === item.no) {
        return item ;
      }})

      if (current_station.station === route_station[0].station) {
          return (
            <div>
            <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`DEPARTED FROM ${current_station.station_.name}`}</div>
            </div>
            </div>
          )
      }
    }

    renderNextStoppage(){

      const {current_station , route} = this.props.liveStatus ;

      const route_station = route.filter((item) => {if (current_station.no === item.no) {
        return item;
      }})

      const next_station_no = route_station[0].no;

      if (current_station.station === route_station[0].station) {
          return (
            <div>
            <div style={{width : '100%' , height : '70px' , fontSize : '80%'}}>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>NEXT STOPPAGE :</div>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[next_station_no].station_.name}</div>
            </div>
            </div>
          )
      }
    }

  renderCurrentScenarioWhenNotEqual(){
    return (
      <div style={{marginTop : '10px' , height : '170px'}}>
        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>

          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <FiberManualRecord color='#64DD17' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '70px'}}>
            {this.renderLastStoppageNotEqual()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <MyLocation color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
          {this.renderCurrentScenarioNotEqual()}
          </div>
        </div>

        <div style={{float : 'left' , position : 'relative' , width : '33.33%' , height : '170px' , backgroundColor : '#EEEEEE'}}>
          <div style={{height : '40px'}}>
            <div style={{position : 'relative' , top : '16px' , backgroundColor : '#333' , height : '2px' , width : '100%' , zIndex : '1'}}></div>
            <FiberManualRecord color='#F44336' style={{position : 'relative' , width : '100%' , height : '30px' , zIndex : '2'}}/>
          </div>

          <div style={{height : '30px'}}>
            <ArrowUpward color='#212121' style={{width : '100%' , height : '30px'}}/>
          </div>

          <div style={{height : '80px'}}>
            {this.renderNextStoppageNotEqual()}
          </div>
        </div>

      </div>
    )
  }

  renderLastStoppageNotEqual(){
    const {current_station , route} = this.props.liveStatus ;

    const route_station = route.filter((item) => {if (current_station.no === item.no) {
      return item ;
    }});

    const last_stoppage_key = (route_station[0].no - 2) ;

    if (current_station.station !== route_station[0].station) {
        return (
          <div>
          <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>PREVIOUS STOPPAGE :</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[last_stoppage_key].station_.name}</div>
          </div>
          </div>
        )
      }
    }

  renderCurrentScenarioNotEqual(){

    const {current_station} = this.props.liveStatus ;

        if (current_station.has_arrived === true && current_station.has_departed === false) {
          return(
            <div>
            <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
              <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`HALTED AT ${current_station.station_.name}(${current_station.station_.code})`}</div>
            </div>
            </div>
          )
        }
        else {
          return (
            <div>
              <div style={{width : '100%' , height : '80px' , fontSize : '80%'}}>
                <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>CURRENT SCENARIO:</div>
                <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{`DEPARTED FROM ${current_station.station_.name}(${current_station.station_.code})`}</div>
              </div>
            </div>
          );
        }

  }

  renderNextStoppageNotEqual(){

    const {current_station , route} = this.props.liveStatus ;

    const route_station = route.filter((item) => {if (current_station.no === item.no) {
      return item;
    }})

    const next_station_key = (route_station[0].no - 1);

    if (current_station.station !== route_station[0].station) {
      return (
        <div>
          <div style={{width : '100%' , height : '70px' , fontSize : '80%'}}>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>NEXT STOPPAGE :</div>
            <div style={{color : '#FFFFFF' ,  backgroundColor : '#311B92'}}>{route[next_station_key].station_.name}</div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{marginTop : '30px'}}>
        <div className="row">
          <div className='col-sm-2'></div>
          <div className="col-sm-8 text-center">
            <div>{ this.props.spinner===false ? <div></div> : <div><CircularProgress color='#3F51B5' /></div>}</div>
            <div>{ this.renderErrorMessage() }</div>
            <div>{ this.renderLiveStatusData() }</div>
          </div>
          <div className='col-sm-2'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {liveStatus : state.liveStatusReducer.info , spinner : state.liveStatusReducer.isFetching , errorMessage : state.liveStatusReducer.errorMessage}
}

export default connect(mapStateToProps)(LiveStatusReciever);
