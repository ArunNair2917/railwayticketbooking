import React from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import FormInput from 'material-ui/svg-icons/action/input';
import FormSend from 'material-ui/svg-icons/content/send';
import { TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import {pnrStatus} from '../../actions/index';

const style = {
  height: 70,
  width: '100%',
  margin: '20px , 20px',
  display: 'inline-block',
};

const PaperComponent = () => {
  return (
    <div>
      <div style={{float : 'left' , position : 'relative' , height : '70px' , width : '15%' , backgroundColor : '#9C27B0'}}></div>
      <div style={{float : 'left' , width : '70%' , height : '70px' , margin : 'auto' , position : 'relative'}} className="text-center">
        <h3 style={{marginTop : '5%' , position : 'relative'}}>PNR STATUS</h3>
      </div>
      <div style={{float : 'left' , position : 'relative' , width : '15%' , height : '70px' , backgroundColor : '#9C27B0'}}></div>
    </div>
  )
}

const required = value => (value == null ? 'Required' : undefined);

const invalidLessLength = value => ( (value.length < 10)  ? 'The PNR Number cannot be less than 10 digits.' : undefined);
const invalidMoreLength = value => ( (value.length > 10)  ? 'The PNR Number cannot be more than 10 digits.' : undefined);

const generallyInvalid = value => ( isNaN(value) ? 'Please enter a valid PNR number.' : '');

class FormPnrStatus extends React.Component {

  onFormSubmit(values){
    console.log(values);
    this.props.pnrStatus(values.pnrStatus);
  }

  renderForm(){
    const {handleSubmit} = this.props;
    return(
      <div style={{marginTop : '20px'}}>
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>

        <div style={{height : '80px'}}>
          <div style={{width : '50%' , position : 'relative' , float : 'left' , height : '60px'}}>
            <div style={{ position : 'relative' , float : 'right' , width : '30%' , height : '60px'}}>
              <IconButton style={{height : '50px'}}>
                <FormInput color='#BF360C'/>
              </IconButton>
            </div>
            <div style={{ float : 'right' , width : '70%' , height : '50px' , marginTop : '10px' }}>
              <div style={{  fontSize : 'large' , height : '50px' , float : 'right'}}>PNR NO.</div>
            </div>
          </div>

          <div style={{width : '50%' , position : 'relative' , float : 'left' , height : '80px'}}>
            <div style={{width : '100%' , height : '60px' , float : 'left'}}>
              <Field
                name="pnrStatus"
                component={TextField}
                format={null}
                hintText=""
                validate={[required , invalidLessLength , invalidMoreLength , generallyInvalid]}
                style={{float : 'left' , position : 'relative' , width : '90%'}}
                floatingLabelStyle={{color : '#795548'}}
                floatingLabelFocusStyle={{color : '#4A148C'}}
                underlineStyle={{borderColor : '#795548'}}
                underlineFocusStyle={{borderColor : '#4A148C'}}
                />
            </div>
          </div>
        </div>

        <div className="text-center" style={{marginTop : '10px'}}>
          <RaisedButton
            type='submit'
            label="GET PNR STATUS"
            icon={<FormSend color='#33691E'/>}
            backgroundColor='#9E9E9E'
            labelColor='#FFFFFF'
            />
        </div>
      </form>
      </div>
    )
  }

  render() {
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
    );
  }
}

FormPnrStatus = reduxForm({
  form: 'FormPnr',
})(FormPnrStatus);

export default connect(null , {pnrStatus})(FormPnrStatus);
