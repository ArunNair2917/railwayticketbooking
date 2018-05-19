import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

class RescheduledTrainsReciever extends React.Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderRescheduledTrainsData(){
    if (!this.props.RescheduledTrains) {
      return <div></div>
    }else{
      const {response_code} = this.props.RescheduledTrains;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>The information is currently not available!</div>}/>
    }
      else {
          return (
          <div>
            <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderRescheduledTrainsSuccessData()}/>
          </div>
        )
      }
    }
  }

  renderRescheduledTrainsSuccessData(){

    const {trains} = this.props.RescheduledTrains ;

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
                    <th style={{backgroundColor : '#673AB7'}}>RESCHEDULED DATE</th>
                    <th style={{backgroundColor : '#673AB7'}}>SOURCE</th>
                    <th style={{backgroundColor : '#673AB7'}}>DESTINATION</th>
                    <th style={{backgroundColor : '#673AB7'}}>RESCHEDULED BY</th>
                    <th style={{backgroundColor : '#673AB7'}}>RESCHEDULED TIME</th>
                  </tr>
              </thead>
              <tbody>
                  {trains.map((item , index) => {
                    return (
                      <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{<span style={{ color : '#EF5350'}}>{item.number}</span>}</td>
                      <td>{item.name}</td>
                      <td>{item.rescheduled_date}</td>
                      <td>{item.to.name} ({item.to.code})</td>
                      <td>{item.from.name}({item.from.code})</td>
                      <td>{item.time_diff}</td>
                      <td>{item.rescheduled_time}</td>
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
            <div>{ this.renderRescheduledTrainsData() }</div>
          </div>
          <div className='col-sm-1'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {RescheduledTrains : state.rescheduledTrainsReducer.info , spinner : state.rescheduledTrainsReducer.isFetching , errorMessage : state.rescheduledTrainsReducer.errorMessage}
}

export default connect(mapStateToProps)(RescheduledTrainsReciever);
