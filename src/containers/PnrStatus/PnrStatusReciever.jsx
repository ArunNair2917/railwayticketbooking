import React from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';


class PnrStatusReciever extends React.Component {

  renderErrorMessage(){
    if (this.props.errorMessage === false) {
      return <div></div>
    }else {
      return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>'Railway servers are busy. Please try again after some time!'</div>}/>
    }
  }

  renderPnrStatusData(){
    if (!this.props.pnrStatus) {
      return <div></div>
    }else{
      const {response_code} = this.props.pnrStatus;
      if (response_code === 204) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' , backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>Either the Train Number is wrong or the information is not available!</div>}/>
      }
      else if (response_code === 510) {
        return <Paper style={{height : '50px' , width : '100%' , display : 'inline-block' ,  backgroundColor : '#C62828'}} zDepth={3} children={<div style={{color : '#FFFFFF'}}>{this.props.liveStatus.error}</div>}/>
      }
      else {
        return (
        <div>
          <Paper style={{minHeight : '400px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderPnrStatusSuccessData()}/>
        </div>
      )
      }
    }
  }

  renderPnrStatusSuccessData(){
    return (
      <div>
        The success data will be displayed here !!!
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid" style={{marginTop : '30px'}}>
        <div className="row">
          <div className='col-sm-2'></div>
          <div className="col-sm-8 text-center">
            <div>{ this.props.spinner===false ? <div></div> : <div><CircularProgress color='#3F51B5' /></div>}</div>
            <div>{ this.renderErrorMessage() }</div>
            <div>{ this.renderPnrStatusData() }</div>
          </div>
          <div className='col-sm-2'></div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {pnrStatus : state.pnrStatusReducer.info , spinner : state.pnrStatusReducer.isFetching , errorMessage : state.pnrStatusReducer.errorMessage}
}

export default connect(mapStateToProps)(PnrStatusReciever);
