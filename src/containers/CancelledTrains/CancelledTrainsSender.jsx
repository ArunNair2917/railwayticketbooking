import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {
  DatePicker
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import MapsTrain from 'material-ui/svg-icons/maps/train';
import IconButton from 'material-ui/IconButton';
import FormDate from 'material-ui/svg-icons/action/date-range';
import FormSend from 'material-ui/svg-icons/content/send';

import {getCancelledTrains} from '../../actions/index';

const style = {
  height: 70,
  width: '100%',
  margin: '20px , 20px',
  display: 'inline-block',
};

const PaperComponent = () => {
  return (
    <div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <Cancel color='#F44336' style={{ width : '100%' , height : '70px'}}/>
      </div>
      <div style={{float : 'left' , width : '70%' , height : '70px' , margin : 'auto' , position : 'relative'}} className="text-center">
        <h3 style={{marginTop : '5%' , position : 'relative'}}>CANCELLED TRAINS</h3>
      </div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <MapsTrain color="#2196F3" style={{ width : '100%' , height : '70px'}}/>
      </div>
    </div>
  )
}

const required = value => (value == null ? 'Required' : undefined);


class FormCancelledTrains extends Component {
  onFormSubmit(values){
    this.props.getCancelledTrains(values.date);
  }

  renderForm(){
    const {handleSubmit} = this.props;
    return(
      <div style={{marginTop : '20px'}}>
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>

        <div style={{height : '50px'}}>
          <div style={{width : '40%' , position : 'relative' , float : 'left'}}>
            <IconButton style={{ position : 'relative' , float : 'right'}}>
              <FormDate color='#9C27B0'/>
            </IconButton>
          </div>

          <div style={{width : '60%' , position : 'relative' , float : 'left'}}>
          <Field
            name="date"
            component={DatePicker}
            format={null}
            hintText="Date"
            validate={required}
            autoOk={true}
            textFieldStyle={{ width : '100px'}}
            style={{float : 'left' , position : 'relative'}}
            />
          </div>
        </div>

        <div className="text-center" style={{marginTop : '30px'}}>
          <RaisedButton
            type='submit'
            label="GET CANCELLED TRAINS"
            icon={<FormSend color='#33691E'/>}
            backgroundColor='#9E9E9E'
            labelColor='#FFFFFF'
            />
        </div>
      </form>
      </div>
    )
  }

  render(){
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <Paper style={style} zDepth={3} children={<PaperComponent/>}/>
          </div>
          <div className="col-sm-2"></div>
        </div>

        <div className="row" style={{marginTop : '20px'}}>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Paper style={{height : '170px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderForm()}/>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    )
  }
}

FormCancelledTrains = reduxForm({
  form: 'FormCancelledTrains',
  initialValues: {
    date : new Date()
  }
})(FormCancelledTrains);

export default connect(null , {getCancelledTrains})(FormCancelledTrains);
