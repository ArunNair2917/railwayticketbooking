import React from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {RadioButton , RadioButtonGroup} from 'material-ui';
import {AutoComplete} from 'redux-form-material-ui';
import FormSend from 'material-ui/svg-icons/content/send';
import FormInput from 'material-ui/svg-icons/action/input';
import AccessTime from 'material-ui/svg-icons/device/access-time';
import NearMe from 'material-ui/svg-icons/maps/near-me';
import Place from 'material-ui/svg-icons/maps/place';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import {fetchingLiveStationTrains} from '../../actions/index';

const style = {
  height: 90,
  width: '100%',
  margin: '20px , 20px',
  display: 'inline-block',
};

const PaperComponent = () => {
  return (
    <div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <Place color='#9C27B0' style={{ width : '100%' , height : '80px'}}/>
      </div>
      <div style={{float : 'left' , width : '70%' , height : '80px' , margin : 'auto' , position : 'relative'}} className="text-center">
        <h3 style={{marginTop : '20px' , position : 'relative'}}>LIVE STATION</h3>
      </div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <NearMe color="#00C853" style={{ width : '100%' , height : '80px'}}/>
      </div>
    </div>
  )
}


const required = value => (value == null ? 'Required' : undefined);

const bracketsChecking = (value) => {
  return (value.indexOf('(')!==-1 && value.indexOf(')')!==-1) ? undefined : 'Please choose Station Name from the suggestion list.'
}

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

class FormLiveStation extends React.Component {

  onFormSubmit(values){
    this.props.fetchingLiveStationTrains(values.From , values.AccessTime)
  }

  renderForm(){

    const {handleSubmit} = this.props;

    return(
      <div style={{marginTop : '20px'}}>
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>

        <div style={{height : '90px' , marinBottom : '20px'}}>
          <div style={{width : '30%'  , height : '90px' , position : 'relative' , float : 'left'}}>
            <IconButton style={{ position : 'relative' , float : 'right' , marginTop : '25px'}}>
              <FormInput color='#BF360C'/>
            </IconButton>
          </div>
          <div style={{width : '70%' , height : '90px' ,  position : 'relative' , float : 'left'}}>
          <Field
            name="From"
            validate={[required , bracketsChecking]}
            component={AutoComplete}
            floatingLabelText="Station Name Or Code"
            filter={MUIAutoComplete.caseInsensitiveFilter}
            maxSearchResults={5}
            dataSource={this.props.stationSuggestArray}
            textFieldStyle={{width : '80%'}}
            style={{position : 'relative' , width : '100%'}}
            floatingLabelStyle={{color : '#795548'}}
            floatingLabelFocusStyle={{color : '#4A148C'}}
            underlineStyle={{borderColor : '#795548'}}
            underlineFocusStyle={{borderColor : '#4A148C'}}
            />
          </div>
        </div>

        <div style={{height : '90px' , marinBottom : '20px'}}>
          <div style={{height : '90px'}}>
            <div style={{width : '60%' , position : 'relative' , float : 'left' , height : '90px'}}>
              <div style={{ position : 'relative' , float : 'right' , width : '25%' , height : '90px'}}>
                <IconButton style={{height : '50px'}}>
                  <AccessTime color='#BF360C'/>
                </IconButton>
              </div>
              <div style={{ float : 'right' , width : '75%' , height : '50px' , marginTop : '10px' }}>
                <div style={{  fontSize : 'large' , height : '50px' , float : 'right'}}>WITHIN TIME</div>
              </div>
            </div>
          <div style={{width : '40%' , height : '90px' ,  position : 'relative' , float : 'left' , marginTop : '10px'}}>
            <Field name="AccessTime" component={renderRadioGroup}>
              <RadioButton value={2} label="2 hours" />
              <RadioButton value={4} label="4 hours" />
            </Field>
          </div>
        </div>
      </div>

        <div className="text-center" style={{marginTop : '30px'}}>
          <RaisedButton
            type='submit'
            label="GET TRAINS"
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
            <Paper style={{minHeight : '300px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderForm()}/>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}

FormLiveStation = reduxForm({
  form: 'FormLiveStation',
  initialValues: {
    AccessTime : 2
  }
})(FormLiveStation);

function mapStateToProps(state) {
  return {stationSuggestArray : state.stationSuggestReducer}
}

export default connect(mapStateToProps , {fetchingLiveStationTrains})(FormLiveStation);
