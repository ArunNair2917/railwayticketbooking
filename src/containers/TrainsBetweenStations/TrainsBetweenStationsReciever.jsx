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

  renderTrainsBetweenStationsData(){
    if (!this.props.trainsBetweenStations) {
      return <div></div>
    }else{
      const {response_code} = this.props.trainsBetweenStations;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>The information is currently not available!</div>}/>
    }
      else {
        if (this.props.trainsBetweenStations.total === 0) {
          return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#4E342E'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>Sorry No matching trains were found!</div>}/>
        }else {
          return (
          <div>
            <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderTrainsBetweenStationsSuccessData()}/>
          </div>
        )
        }
      }
    }
  }

  renderTrainsBetweenStationsSuccessData(){

    const {train} = this.props.trainsBetweenStations ;

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
                  <th style={{backgroundColor : '#673AB7'}}>M</th>
                  <th style={{backgroundColor : '#673AB7'}}>T</th>
                  <th style={{backgroundColor : '#673AB7'}}>W</th>
                  <th style={{backgroundColor : '#673AB7'}}>T</th>
                  <th style={{backgroundColor : '#673AB7'}}>F</th>
                  <th style={{backgroundColor : '#673AB7'}}>S</th>
                  <th style={{backgroundColor : '#673AB7'}}>S</th>
                  <th style={{backgroundColor : '#673AB7'}}>FROM</th>
                  <th style={{backgroundColor : '#673AB7'}}>DEP.</th>
                  <th style={{backgroundColor : '#673AB7'}}>TO</th>
                  <th style={{backgroundColor : '#673AB7'}}>ARR.</th>
                  <th style={{backgroundColor : '#673AB7'}}>TRAVEL TIME</th>
                </tr>
              </thead>
              <tbody>
                  {train.map((item , index) => {
                    return (
                      <tr key={index}>
                      <th scope="row">{item.no}</th>
                      <td>{item.number}</td>
                      <td>{item.name}</td>
                      <td>{item.days[0].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[0].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[0].runs}</span> }</td>
                      <td>{item.days[1].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[1].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[1].runs}</span> }</td>
                      <td>{item.days[2].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[2].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[2].runs}</span> }</td>
                      <td>{item.days[3].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[3].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[3].runs}</span> }</td>
                      <td>{item.days[4].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[4].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[4].runs}</span> }</td>
                      <td>{item.days[5].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[5].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[5].runs}</span> }</td>
                      <td>{item.days[6].runs === 'Y' ? <span style={{ color : '#66BB6A'}}>{item.days[6].runs}</span> : <span style={{ color : '#EF5350'}}>{item.days[6].runs}</span> }</td>
                      <td>{item.from.code}</td>
                      <td>{item.src_departure_time}</td>
                      <td>{item.to.code}</td>
                      <td>{item.dest_arrival_time}</td>
                      <td>{item.travel_time}</td>
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
            <div>{ this.renderTrainsBetweenStationsData() }</div>
          </div>
          <div className='col-sm-1'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {trainsBetweenStations : state.trainsBetweenStationsReducer.info , spinner : state.trainsBetweenStationsReducer.isFetching , errorMessage : state.trainsBetweenStationsReducer.errorMessage}
}

export default connect(mapStateToProps)(TrainRouteReciever);
