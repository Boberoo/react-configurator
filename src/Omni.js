import React from 'react';
import ReactDOM from 'react-dom';
//import dotenv from 'dotenv';

class OmniReactComponent extends React.Component {
   
  constructor(props) {
    super(props);
    //dotenv.config();
    const baseUrl = this.getDefaultVal("BaseUrl", "https://st.omniaccounts.co.za:55685");
    
    //console.log(baseUrl);
    const credentials = "UserName="+this.getDefaultVal("UserName", "Guest")+"&Password="+this.getDefaultVal("Password", "Dev2021")+"&CompanyName="+this.getDefaultVal("CompanyName", "SA Example Company [Demo]");
    //console.log(credentials);
    
  this.state = {
      //quote: null,
      baseUrl,
      credentials,
      userName: this.getDefaultVal("UserName", "Guest"),
      password: this.getDefaultVal("Password", "Dev2021"),
      companyName: this.getDefaultVal("CompanyName", "Omni Trucks"),
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
  
  getUserName = () => {
    return sessionStorage.UserName;
  }
  
  formatQty = (qty) => {
    return qty.toLocaleString(undefined, {maximumFractionDigits:3});
  }
   
  formatPrice = (price) => {
    return price.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  
  setUserNameAndLogonToken = (userName, logonToken) => {
    sessionStorage.UserName = userName;
    sessionStorage.Token = logonToken;
    
    this.setState({
            userName: userName,
            password: logonToken
          });
  }
  
  doLogonChanged = () => {
    this.setState({
            userName: sessionStorage.UserName,
            password: sessionStorage.Token
          });
  }
  
  
  restGet = (endpoint, id) => {
    //##will need a callback for what do do with the success response
  }
}

export default OmniReactComponent;