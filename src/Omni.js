import React from 'react';
import ReactDOM from 'react-dom';
//import dotenv from 'dotenv';

class OmniReactComponent extends React.Component {
  
  
  
  
  constructor(props) {
    super(props);
    //dotenv.config();
    const baseUrl = this.getDefaultVal("BaseUrl", "http://st.omniaccounts.co.za:55683");
    //console.log(baseUrl);
    const credentials = "UserName="+this.getDefaultVal("UserName", "Guest")+"&Password="+this.getDefaultVal("Password", "Dev2021")+"&CompanyName="+this.getDefaultVal("CompanyName", "SA Example Company [Demo]");
    //console.log(credentials);
    
	this.state = {
      //quote: null,
      baseUrl,
      credentials,
      isLoaded: false
    };
	
  }
  
  getDefaultVal = (name, defaultval) => {
    let val = (new URLSearchParams(window.location.search)).get(name); //NB. is case sensitive!
    if (!val || val === "") {
      val = process.env.["REACT_APP_"+name]; //NB. for react, env variables MUST be prefixed with REACT_APP_
  }
    if (!val || val === "")
      val = defaultval;
    return val;
  }


}

export default OmniReactComponent;