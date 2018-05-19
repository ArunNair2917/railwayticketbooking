import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <div className="container-fluid" style={{backgroundColor : '#333333' , color : '#FFFFFF' , marginTop : '30px'}}>
        <div className="row">

          <div className="col-sm-6 text-center" style={{backgroundColor : '#333' , color : '#FFFFFF' , minHeight : '100px'}}>

            <div style={{minHeight : '40px'}}>
            <h5 style={{marginTop : '10px' , float : 'left'}}>Copyright &copy; 2017</h5>
            </div>

            <div style={{minHeight : '50px'}}>
            <div style={{marginTop : '10px' , marginRight : '10px' , color : '#FFC107' , float : 'left' , textAlign : 'left' , height : '20px'}}>DESIGNED AND DEVELOPED BY : <span style={{color : '#FFFFFF'}}>ARUN NAIR</span></div>
            </div>

            <div style={{minHeight : '50px' , marginBottom : '10px'}}>
            <div style={{marginTop : '10px' , marginRight : '10px' , color : '#FFC107' , float : 'left' , textAlign : 'left' , height : '20px'}}>CONTACT : <span style={{color : '#FFFFFF'}}>arunnair@gmail.com</span></div>
            </div>


          </div>


            <div className="col-sm-6 text-center" style={{backgroundColor : '#333' , color : '#FFFFFF' , minHeight : '100px'}}>

              <div style={{minHeight : '100px' , marginBottom : '20px'}}>
              <div style={{marginTop : '10px' , marginRight : '10px' , color : '#FFC107' , float : 'left' , textAlign : 'left' , height : '20px'}}>DISCLAIMER : <span style={{color : '#FFFFFF'}}>indianrailroad.in is for Travel Information Purpose only and is not associated with Indian Railways or Government of India.</span></div>
              </div>

          </div>

      </div>
    </div>
    );
  }

}

export default Footer;
