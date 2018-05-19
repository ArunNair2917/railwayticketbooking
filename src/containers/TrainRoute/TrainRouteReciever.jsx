import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

class TrainRouteReciever extends React.Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderTrainRouteData(){
    if (!this.props.trainRoute) {
      return <div></div>
    }else{
      const {response_code} = this.props.trainRoute;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>Either the Train Number is wrong or the information is not available!</div>}/>
      }
      else {
        return (
        <div>
          <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderTrainRouteSuccessData()}/>
        </div>
      )
      }
    }
  }

  renderTrainRouteSuccessData(){

    const {train , route} = this.props.trainRoute ;

    return (
      <div>

        <div style={{height : '50px' , backgroundColor : '#333' , color : '#FFFFFF' , paddingTop : '13px' , marginBottom : '10px'}}>
          <h4>FETCHED DETAILS</h4>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px'}}>
          <h5 style={{marginTop : '3px'}}>TRAIN NUMBER : {this.props.trainRoute.train.number}</h5>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px' , marginBottom : '10px'}}>
          <h5>{this.props.trainRoute.train.name}</h5>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px'}}>
          <h5 style={{float : 'left' , marginTop : '3px'}}>RUNNING SCHEDULE :</h5>
        </div>

        <div style={{ height : '120px'}}>
          <table className="table table-responsive table-bordered">
            <thead className="thead-inverse">
              <tr>
                {train.days.map((item , index) => {return <th key={index} style={{backgroundColor : '#673AB7'}}>{item['day-code']}</th>})}
              </tr>
            </thead>
            <tbody>
              <tr>
                {train.days.map((item , index) => { return <td key={index} > {item.runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.runs}</span> : <span style={{ color : '#EF5350'}}>{item.runs}</span> }</td>} )}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px'}}>
          <h5 style={{float : 'left' , marginTop : '3px'}}>CLASSES AVAILABLE :</h5>
        </div>

        <div style={{ height : '120px'}}>
          <table className="table table-responsive table-bordered">
            <thead className="thead-inverse">
              <tr>
                {train.classes.map((item , index) => { return <th key={index} style={{backgroundColor : '#673AB7'}}>{item['class-code']}</th>})}
              </tr>
            </thead>
            <tbody>
              <tr>
                {train.classes.map((item , index) => { return <td key={index} > {item.available === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.available}</span> : <span style={{ color : '#EF5350'}}>{item.available}</span> }</td>} )}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{backgroundColor : '#EEEEEE' , height : '30px'}}>
          <h5 style={{float : 'left' , marginTop : '3px'}}>COMPLETE INFORMATION :</h5>
        </div>

        <div style={{ minHeight : '120px'}}>
          <table className="table table-responsive table-bordered">
            <thead className="thead-inverse">
              <tr>
                <th style={{backgroundColor : '#673AB7'}}>S.NO.</th>
                <th style={{backgroundColor : '#673AB7'}}>STN CODE</th>
                <th style={{backgroundColor : '#673AB7'}}>STN NAME</th>
                <th style={{backgroundColor : '#673AB7'}}>ROUTE NO.</th>
                <th style={{backgroundColor : '#673AB7'}}>ARRIVAL TIME</th>
                <th style={{backgroundColor : '#673AB7'}}>DEPARTURE TIME</th>
                <th style={{backgroundColor : '#673AB7'}}>HALT TIME(MINUTES)</th>
                <th style={{backgroundColor : '#673AB7'}}>DISTANCE(KM.)</th>
                <th style={{backgroundColor : '#673AB7'}}>DAY</th>
              </tr>
            </thead>
            <tbody>
                {route.map((item , index) => {
                  return (
                    <tr key={index}>
                    <th scope="row">{item.no}</th>
                    <td>{item.code}</td>
                    <td>{item.fullname}</td>
                    <td>{item.route}</td>
                    <td>{item.scharr}</td>
                    <td>{item.schdep}</td>
                    <td>{item.halt}</td>
                    <td>{item.distance}</td>
                    <td>{item.day}</td>
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
            <div>{ this.renderTrainRouteData() }</div>
          </div>
          <div className='col-sm-1'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {trainRoute : state.trainRouteReducer.info , spinner : state.trainRouteReducer.isFetching , errorMessage : state.trainRouteReducer.errorMessage}
}

export default connect(mapStateToProps)(TrainRouteReciever);
