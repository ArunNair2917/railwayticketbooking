import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

class LiveStationReciever extends React.Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderLiveStationData(){
    if (!this.props.liveStation) {
      return <div></div>
    }else{
      const {response_code} = this.props.liveStation;

      if (response_code === 204 && this.props.liveStation.total === 0) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#4E342E'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>Sorry No trains were found in the given time frame!</div>}/>
      }

      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>The information is currently not available!</div>}/>
      }

      else {
          return (
          <div>
            <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderLiveStationSuccessData()}/>
          </div>
        )

      }
    }
  }

  renderLiveStationSuccessData(){

    const {trains} = this.props.liveStation ;

    return (
      <div>

        <div style={{height : '50px' , backgroundColor : '#333' , color : '#FFFFFF' , paddingTop : '13px' , marginBottom : '10px'}}>
          <h4>FETCHED DETAILS</h4>
        </div>

          <div style={{ minHeight : '120px'}}>
            <table className="table table-responsive table-bordered">
              <thead className="thead-inverse">
                <tr>
                    <th style={{backgroundColor : '#673AB7'}}>S.NO.</th>
                    <th style={{backgroundColor : '#673AB7'}}>TRAIN NO.</th>
                    <th style={{backgroundColor : '#673AB7'}}>TRAIN NAME</th>
                    <th style={{backgroundColor : '#673AB7'}}>SCH. ARR.</th>
                    <th style={{backgroundColor : '#673AB7'}}>DELAY IN ARR.</th>
                    <th style={{backgroundColor : '#673AB7'}}>EXP. ARR.</th>
                    <th style={{backgroundColor : '#673AB7'}}>SCH. DEP.</th>
                    <th style={{backgroundColor : '#673AB7'}}>DELAY IN DEP.</th>
                    <th style={{backgroundColor : '#673AB7'}}>EXP. DEP.</th>
                  </tr>
              </thead>
              <tbody>
                  {trains.map((item , index) => {
                    return (
                      <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{item.number}</td>
                      <td>{item.name}</td>
                      <td>{item.scharr}</td>
                      <td>{item.delayarr === 'RT' ? <span style={{ color : '#212121'}}>{item.delayarr}</span> : <span style={{ color : '#EF5350'}}>{item.delayarr} Hrs</span> }</td>
                      <td>{item.actarr}</td>
                      <td>{item.schdep}</td>
                      <td>{item.delaydep === 'RT' ? <span style={{ color : '#212121'}}>{item.delaydep}</span> : <span style={{ color : '#EF5350'}}>{item.delaydep} Hrs</span> }</td>
                      <td>{item.actdep}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid" style={{marginTop : '30px'}}>
        <div className="row">
          <div className='col-sm-1'></div>
          <div className="col-sm-10 text-center">
            <div>{ this.props.spinner===false ? <div></div> : <div><CircularProgress color='#3F51B5' /></div>}</div>
            <div>{ this.renderErrorMessage() }</div>
            <div>{ this.renderLiveStationData() }</div>
          </div>
          <div className='col-sm-1'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {liveStation : state.liveStationReducer.info , spinner : state.liveStationReducer.isFetching , errorMessage : state.liveStationReducer.errorMessage}
}

export default connect(mapStateToProps)(LiveStationReciever);
