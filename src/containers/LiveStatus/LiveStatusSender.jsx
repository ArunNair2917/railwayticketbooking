import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
  DatePicker,
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MapsTrain from 'material-ui/svg-icons/maps/train';
import IconButton from 'material-ui/IconButton';
import FormDate from 'material-ui/svg-icons/action/date-range';
import FormInput from 'material-ui/svg-icons/action/input';
import FormSend from 'material-ui/svg-icons/content/send';

import {liveStatus} from '../../actions/index';

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
        <MapsPlace color='#F44336' style={{ width : '100%' , height : '70px'}}/>
      </div>
      <div style={{float : 'left' , width : '70%' , height : '70px' , margin : 'auto' , position : 'relative'}} className="text-center">
        <h3 style={{marginTop : '5%' , position : 'relative'}}>SPOT YOUR TRAIN</h3>
      </div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <MapsTrain color="#2196F3" style={{ width : '100%' , height : '70px'}}/>
      </div>
    </div>
  )
}

const required = value => (value == null ? 'Required' : undefined);

const invalidLength = value => ( (value.length > 5)&&(value.length < 10)  ? 'Invalid train no. Or Name. Please choose from the suggestion list.' : undefined);

const lessLength = value => (value.length<5 ? 'Train No cannot be less than 5 digits!' : undefined);


class FormLiveStatus extends Component {
  onFormSubmit(values){
    this.props.liveStatus(values.trainNo , values.date);
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

        <div style={{height : '90px' , marinBottom : '20px'}}>
          <div style={{width : '30%'  , height : '90px' , position : 'relative' , float : 'left'}}>
            <IconButton style={{ position : 'relative' , float : 'right' , marginTop : '25px'}}>
              <FormInput color='#BF360C'/>
            </IconButton>
          </div>
          <div style={{width : '70%' , height : '90px' ,  position : 'relative' , float : 'left'}}>
          <Field
            name="trainNo"
            validate={[required , invalidLength , lessLength]}
            component={AutoComplete}
            floatingLabelText="Train No."
            filter={MUIAutoComplete.fuzzyFilter}
            maxSearchResults={2}
            dataSource={this.props.autoSuggest}
            textFieldStyle={{width : '80%'}}
            style={{position : 'relative' , width : '100%'}}
            floatingLabelStyle={{color : '#795548'}}
            floatingLabelFocusStyle={{color : '#4A148C'}}
            underlineStyle={{borderColor : '#795548'}}
            underlineFocusStyle={{borderColor : '#4A148C'}}
            />
          </div>
        </div>

        <div className="text-center" style={{marginTop : '30px'}}>
          <RaisedButton
            type='submit'
            label="GET LIVE STATUS"
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
            <Paper style={{height : '250px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderForm()}/>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    )
  }
}

FormLiveStatus = reduxForm({
  form: 'FormActual',
  initialValues: {
    date : new Date()
  }
})(FormLiveStatus);

function mapStateToProps(state) {
  return {autoSuggest : state.autoSuggestReducer}
}

export default connect(mapStateToProps , {liveStatus})(FormLiveStatus);
