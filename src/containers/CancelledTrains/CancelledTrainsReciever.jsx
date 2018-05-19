import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

class CancelledTrainsReciever extends React.Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderCancelledTrainsData(){
    if (!this.props.cancelledTrains) {
      return <div></div>
    }else{
      const {response_code} = this.props.cancelledTrains;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>The information is currently not available!</div>}/>
    }
      else {
          return (
          <div>
            <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderCancelledTrainsSuccessData()}/>
          </div>
        )
      }
    }
  }

  renderCancelledTrainsSuccessData(){

    const {trains} = this.props.cancelledTrains ;

    return (
      <div>

        <div style={{height : '50px' , backgroundColor : '#333' , color : '#FFFFFF' , paddingTop : '13px' , marginBottom : '10px'}}>
          <h4>FETCHED DETAILS</h4>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '35px'}}>
          <h5 style={{marginTop : '3px' , float : 'left'}}>LAST UPDATED : </h5>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '35px'}}>
          <h5 style={{marginTop : '3px' , float : 'left'}}>TIME : {this.props.cancelledTrains.last_updated.time}</h5>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '35px' , marginBottom : '10px'}}>
          <h5 style={{marginTop : '3px' , float : 'left'}}>DATE : {this.props.cancelledTrains.last_updated.date}</h5>
        </div>

          <div style={{ minHeight : '120px'}}>
            <table className="table table-responsive table-bordered">
              <thead className="thead-inverse">
                <tr>
                    <th style={{backgroundColor : '#673AB7'}}>S.NO.</th>
                    <th style={{backgroundColor : '#673AB7'}}>TRAIN NO.</th>
                    <th style={{backgroundColor : '#673AB7'}}>TRAIN NAME</th>
                    <th style={{backgroundColor : '#673AB7'}}>START TIME</th>
                    <th style={{backgroundColor : '#673AB7'}}>TRAIN TYPE</th>
                    <th style={{backgroundColor : '#673AB7'}}>SOURCE</th>
                    <th style={{backgroundColor : '#673AB7'}}>DESTINATION</th>
                  </tr>
              </thead>
              <tbody>
                  {trains.map((item , index) => {
                    return (
                      <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{<span style={{ color : '#EF5350'}}>{item.train.number}</span>}</td>
                      <td>{item.train.name}</td>
                      <td>{item.train.start_time}</td>
                      <td>{item.train.type}</td>
                      <td>{item.source.name} ({item.source.code})</td>
                      <td>{item.dest.name} ({item.dest.code})</td>
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
            <div>{ this.renderCancelledTrainsData() }</div>
          </div>
          <div className='col-sm-1'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {cancelledTrains : state.cancelledTrainsReducer.info , spinner : state.cancelledTrainsReducer.isFetching , errorMessage : state.cancelledTrainsReducer.errorMessage}
}

export default connect(mapStateToProps)(CancelledTrainsReciever);
