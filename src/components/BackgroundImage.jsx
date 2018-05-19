import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

import backgroundImage from '../images/BackgroundImageFinal.jpg';
import IndianRailroad from '../images/INDIAN-RAILROAD3.png';

const style = {
  button : {
     backgroundColor : '#333333' ,
     color : '#FFFFFF'
  }
}

class BackgroundImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => {
    setTimeout(this.setState({open: false}) , 3000);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            children={<div>
              <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                 style={{backgroundColor : '#333'}}
              >
                <div style={{backgroundColor : '#333'}}>
                <Link to="/"><MenuItem onTouchTap={this.handleClose} style={style.button}><div className="embed-responsive embed-responsive-16by9"><img className="embed-responsive-item" src={IndianRailroad} alt="IndianRailroad"/></div></MenuItem></Link>
                <Link to="/"><MenuItem onTouchTap={this.handleClose} style={style.button}>Home</MenuItem></Link>
                <Link to="/live-status"><MenuItem onTouchTap={this.handleClose} style={style.button}>Live Status</MenuItem></Link>
                <Link to="/train-schedule"><MenuItem onTouchTap={this.handleClose} style={style.button}>Train Schedule</MenuItem></Link>
                <Link to="/trains-between-stations"><MenuItem onTouchTap={this.handleClose} style={style.button}>Trains Between Stations</MenuItem></Link>
                <Link to="/train-arrivals-at-station"><MenuItem onTouchTap={this.handleClose} style={style.button}>Train Arrivals at Station</MenuItem></Link>
                <Link to="/cancelled-trains"><MenuItem onTouchTap={this.handleClose} style={style.button}>Cancelled Trains</MenuItem></Link>
                <Link to="/rescheduled-trains"><MenuItem onTouchTap={this.handleClose} style={style.button}>Rescheduled Trains</MenuItem></Link>
                <MenuItem onTouchTap={this.handleClose} style={style.button}></MenuItem>
                <MenuItem onTouchTap={this.handleClose} style={style.button}></MenuItem>
                <MenuItem onTouchTap={this.handleClose} style={style.button}></MenuItem>
                <MenuItem onTouchTap={this.handleClose} style={style.button}></MenuItem>
                </div>
              </Drawer>
            </div>}
            style={{position : 'absolute' , background : 'transparent'}}
            />

          <div className="embed-responsive embed-responsive-21by9">
            <Link to="/">
            <img className="embed-responsive-item" src={backgroundImage} alt="Responsive"/>
            </Link>
          </div>

            </div>
      </div>
    );
  }

}

export default BackgroundImage;
