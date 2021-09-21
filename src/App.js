import logo from './logo.svg';
import './App.css';
import QuoteBuilder from './QuoteBuilder.js';
import Login from './Login.js';

/*
  
  TO DO
  
  - finish off the login routine, needs to pass  user credentials through to API
  - move the GET and PUT/POST routine that the quote does to the base class
  - if no refno has been specified in the URL, let the user pick from a list of quotes, or at least type the reference number in
  - change quote lines display from a UL to a table - as long as the expand is going to be okay
  - display price for lines that doesn't have a recipe

*/


function getDefaultVal(name, defaultval) {
  let val = (new URLSearchParams(window.location.search)).get(name); //NB. is case sensitive!
  if (!val || val === "") {
      val = process.env.["REACT_APP_"+name]; //NB. for react, env variables MUST be prefixed with REACT_APP_
    }
  if (!val || val === "")
    val = defaultval;
  return val;
}

function App() {
    
  const credentials = "UserName="+getDefaultVal("UserName", "Guest")+"&Password="+getDefaultVal("Password", "Dev2021")+"&CompanyName="+getDefaultVal("CompanyName", "SA Example Company [Demo]");
  
  let refno = getDefaultVal("RefNo", "Q00008"); //NB. is case sensitive!
  
  /*if (!sessionStorage.UserName) {
      return (
      <Login />);
    }*/
  
  
  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-name">
        <h1>Configurator</h1>
        <sup>Quote Builder</sup>
        </div>
      </header>
    <QuoteBuilder reference={refno} credentials={credentials}/>
    
    </div>
  );
}

export default App;
