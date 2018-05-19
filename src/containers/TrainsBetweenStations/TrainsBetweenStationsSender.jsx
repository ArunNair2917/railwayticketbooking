import React from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {AutoComplete , DatePicker} from 'redux-form-material-ui';
import FormSend from 'material-ui/svg-icons/content/send';
import FormDate from 'material-ui/svg-icons/action/date-range';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import Explore from 'material-ui/svg-icons/action/explore';
import FirstPage from 'material-ui/svg-icons/navigation/first-page';
import LastPage from 'material-ui/svg-icons/navigation/last-page';

import {fetchingTrainsBetweenStations} from '../../actions/index';

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
        <Explore color='#536DFE' style={{ width : '100%' , height : '80px'}}/>
      </div>
      <div style={{float : 'left' , width : '70%' , height : '80px' , margin : 'auto' , position : 'relative'}} className="text-center">
        <h3 style={{marginTop : '20px' , position : 'relative'}}>TRAINS B/W STATIONS</h3>
      </div>
      <div style={{float : 'left' , position : 'relative' , width : '15%'}}>
        <CompareArrows color="#00BFA5" style={{ width : '100%' , height : '80px'}}/>
      </div>
    </div>
  )
}


const required = value => (value == null ? 'Required' : undefined);

const bracketsChecking = (value) => {
  return (value.indexOf('(')!==-1 && value.indexOf(')')!==-1) ? undefined : 'Please choose Station Name from the suggestion list.'
}

class FormTrainsBetweenStations extends React.Component {

  onFormSubmit(values){
    this.props.fetchingTrainsBetweenStations(values.From , values.To , values.date);
  }

  renderForm(){

    const {handleSubmit} = this.props;

    return(
      <div style={{marginTop : '20px'}}>
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>

        <div style={{height : '90px' , marinBottom : '20px'}}>
          <div style={{width : '30%'  , height : '90px' , position : 'relative' , float : 'left'}}>
            <IconButton style={{ position : 'relative' , float : 'right' , marginTop : '25px'}}>
              <FirstPage color='#BF360C'/>
            </IconButton>
          </div>
          <div style={{width : '70%' , height : '90px' ,  position : 'relative' , float : 'left'}}>
          <Field
            name="From"
            validate={[required , bracketsChecking]}
            component={AutoComplete}
            floatingLabelText="From (Station Name)"
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
          <div style={{width : '30%'  , height : '90px' , position : 'relative' , float : 'left'}}>
            <IconButton style={{ position : 'relative' , float : 'right' , marginTop : '25px'}}>
              <LastPage color='#BF360C'/>
            </IconButton>
          </div>
          <div style={{width : '70%' , height : '90px' ,  position : 'relative' , float : 'left'}}>
          <Field
            name="To"
            validate={[required , bracketsChecking]}
            component={AutoComplete}
            floatingLabelText="To (Station name)"
            filter={MUIAutoComplete.caseInsensitiveFilter}
            maxSearchResults={3}
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
            style={{float : 'left' , position : 'relative' , color : '#795548'}}
            />
          </div>
        </div>

        <div className="text-center" style={{marginTop : '30px'}}>
          <RaisedButton
            type='submit'
            label="GET TRAINS B/W STATIONS"
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
            <Paper style={{minHeight : '350px' , width : '100%' , display : 'inline-block'}} zDepth={3} children={this.renderForm()}/>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}

FormTrainsBetweenStations = reduxForm({
  form: 'FormTrainsBetweenStations',
  initialValues: {
    date : new Date()
  }
})(FormTrainsBetweenStations);

function mapStateToProps(state) {
  return {stationSuggestArray : state.stationSuggestReducer}
}

export default connect(mapStateToProps , {fetchingTrainsBetweenStations})(FormTrainsBetweenStations);
